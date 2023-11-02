import { TruckRepository } from "../../contract/repository.contract";
import { AppDataSource } from "../../module/datasource.module";
import { Truck, TruckAttribute, TruckCreationsAttributes } from "../model/truck.model";
import { BaseRepository } from "./base.repository";

export class SequelizeTruckRepository extends BaseRepository implements TruckRepository {
    private truck!: typeof Truck;

    init(datasource: AppDataSource): void {
        this.truck = datasource.sqlModel.Truck;
    }

    insertTruck = async (payload: TruckCreationsAttributes): Promise<TruckAttribute> => {
        return this.truck.create(payload);
    };
}
