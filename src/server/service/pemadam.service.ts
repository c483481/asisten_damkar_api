import { isValid } from "ulidx";
import {
    AppRepositoryMap,
    PemadamRepository,
    PosRepository,
    TruckRepository,
    UsersRepository,
} from "../../contract/repository.contract";
import { errorResponses } from "../../response";
import { composeResult, createData } from "../../utils/helper.utils";
import { PemadamCreation_Payload, PemadamResult } from "../dto/pemadam.dto";
import { PemadamCreationAttributes, PemadamJoinAttributes } from "../model/pemadam.model";
import { BaseService } from "./base.service";
import { composePos } from "./pos.service";
import { composeTruck } from "./truck.service";

export class Pemadam extends BaseService implements Pemadam {
    private pemadamRepo!: PemadamRepository;
    private usersRepo!: UsersRepository;
    private truckRepo!: TruckRepository;
    private posRepo!: PosRepository;
    init(repository: AppRepositoryMap): void {
        this.pemadamRepo = repository.pemadam;
        this.posRepo = repository.pos;
        this.truckRepo = repository.truck;
        this.usersRepo = repository.users;
    }

    createPemadam = async (payload: PemadamCreation_Payload): Promise<PemadamResult> => {
        const { userXid, truckXid, posXid } = payload;

        if (!isValid(userXid) || !isValid(truckXid) || !isValid(posXid)) {
            throw errorResponses.getError("E_REQ_1");
        }

        const [pos, truck, user] = await Promise.all([
            this.posRepo.findByXid(posXid),
            this.truckRepo.findByXid(truckXid),
            this.usersRepo.findByXid(userXid),
        ]);

        if (!pos || !truck || !user) {
            throw errorResponses.getError("E_REQ_1");
        }

        const createdValues = createData<PemadamCreationAttributes>({
            posId: pos.id,
            truckId: truck.id,
            userXid,
        });

        const result = (await this.pemadamRepo.insertPemadam(createdValues)) as PemadamJoinAttributes;

        result.Po = pos;
        result.Truck = truck;

        return composePemadam(result);
    };
}

export function composePemadam(row: PemadamJoinAttributes): PemadamResult {
    return composeResult<PemadamJoinAttributes, PemadamResult>(row, {
        pos: row.Po ? composePos(row.Po) : null,
        truck: row.Truck ? composeTruck(row.Truck) : null,
    });
}
