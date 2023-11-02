import { isValid } from "ulidx";
import { AppRepositoryMap, PosRepository, TruckRepository } from "../../contract/repository.contract";
import { composeResult, createData } from "../../utils/helper.utils";
import { TruckCreation_Payload, TruckResult } from "../dto/truck.dto";
import { TruckAttribute, TruckCreationsAttributes } from "../model/truck.model";
import { BaseService } from "./base.service";
import { errorResponses } from "../../response";
import { TruckService } from "../../contract/service.contract";

export class Truck extends BaseService implements TruckService {
    private truckRepo!: TruckRepository;
    private posRepo!: PosRepository;
    init(repository: AppRepositoryMap): void {
        this.truckRepo = repository.truck;
        this.posRepo = repository.pos;
    }

    createTruck = async (payload: TruckCreation_Payload) => {
        const { plat, posXid, userSession } = payload;

        if (!isValid(posXid)) {
            throw errorResponses.getError("E_FOUND_1");
        }

        const pos = await this.posRepo.findByXid(posXid);

        if (!pos) {
            throw errorResponses.getError("E_FOUND_1");
        }

        const createdValues = createData<TruckCreationsAttributes>(
            {
                plat,
                posXid,
                active: true,
            },
            userSession
        );

        const result = await this.truckRepo.insertTruck(createdValues);

        return composeTruck(result);
    };
}

export function composeTruck(row: TruckAttribute): TruckResult {
    return composeResult<TruckAttribute, TruckResult>(row, {
        posXid: row.posXid,
        plat: row.plat,
        active: row.active,
    });
}
