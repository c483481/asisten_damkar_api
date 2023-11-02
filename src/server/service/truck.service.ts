import { isValid } from "ulidx";
import { AppRepositoryMap, PosRepository, TruckRepository } from "../../contract/repository.contract";
import { createData } from "../../utils/helper.utils";
import { TruckCreation_Payload } from "../dto/truck.dto";
import { TruckCreationsAttributes } from "../model/truck.model";
import { BaseService } from "./base.service";
import { errorResponses } from "../../response";

export class Truck extends BaseService {
    private truckRepo!: TruckRepository;
    private posRepo!: PosRepository;
    init(repository: AppRepositoryMap): void {
        this.truckRepo = repository.truck;
        this.posRepo = repository.pos;
    }

    createTruck = async (payload: TruckCreation_Payload) => {
        const { plat, posXid, userSession } = payload;

        if (!isValid(posXid)) {
            throw errorResponses.getError("E_REQ_1");
        }

        const createdValues = createData<TruckCreationsAttributes>(
            {
                plat,
                posXid,
                active: true,
            },
            userSession
        );
    };
}
