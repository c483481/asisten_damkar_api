import { Order, WhereOptions } from "sequelize";
import { TruckRepository } from "../../contract/repository.contract";
import { AppDataSource } from "../../module/datasource.module";
import { Truck, TruckAttribute, TruckCreationsAttributes } from "../model/truck.model";
import { BaseRepository } from "./base.repository";
import { FindResult, List_Payload } from "../../module/dto.module";

export class SequelizeTruckRepository extends BaseRepository implements TruckRepository {
    private truck!: typeof Truck;

    init(datasource: AppDataSource): void {
        this.truck = datasource.sqlModel.Truck;
    }

    insertTruck = async (payload: TruckCreationsAttributes): Promise<TruckAttribute> => {
        return this.truck.create(payload);
    };

    listTruck = async (payload: List_Payload): Promise<FindResult<TruckAttribute>> => {
        // retrieve options filters
        const { filters, showAll } = payload;

        // prepare find options
        let limit: number | undefined = undefined;
        let offset: number | undefined = undefined;

        if (!showAll) {
            limit = payload.limit;
            offset = payload.skip;
        }

        // parsing sort option
        const { order } = this.parseSortBy(payload.sortBy);

        const where: WhereOptions<TruckAttribute> = {};

        if (filters.posXid) {
            where.posXid = filters.posXid;
        }

        return await this.truck.findAndCountAll({
            where,
            offset,
            limit,
            order,
        });
    };

    parseSortBy = (sortBy: string): { order: Order } => {
        // determine sorting option
        let order: Order;
        switch (sortBy) {
            case "createdAt-asc": {
                order = [["createdAt", "ASC"]];
                break;
            }
            case "createdAt-desc": {
                order = [["createdAt", "DESC"]];
                break;
            }
            case "updatedAt-asc": {
                order = [["updatedAt", "ASC"]];
                break;
            }
            case "updatedAt-desc": {
                order = [["updatedAt", "DESC"]];
                break;
            }
            default: {
                order = [["createdAt", "DESC"]];
                sortBy = "createdAt-desc";
            }
        }

        return { order };
    };
}
