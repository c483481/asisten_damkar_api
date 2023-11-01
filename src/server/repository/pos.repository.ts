import { Order } from "sequelize";
import { PosRepository } from "../../contract/repository.contract";
import { AppDataSource } from "../../module/datasource.module";
import { FindResult, List_Payload } from "../../module/dto.module";
import { Pos, PosAttributes, PosCreationAttributes } from "../model/pos.model";
import { BaseRepository } from "./base.repository";

export class SequelizePosRepository extends BaseRepository implements PosRepository {
    private pos!: typeof Pos;

    init(datasource: AppDataSource): void {
        this.pos = datasource.sqlModel.Pos;
    }

    insertPos = async (payload: PosCreationAttributes): Promise<PosAttributes> => {
        return this.pos.create(payload);
    };

    listPos = async (payload: List_Payload): Promise<FindResult<PosAttributes>> => {
        // retrieve options filters
        const { showAll } = payload;

        // prepare find options
        let limit: number | undefined = undefined;
        let offset: number | undefined = undefined;

        if (!showAll) {
            limit = payload.limit;
            offset = payload.skip;
        }

        // parsing sort option
        const { order } = this.parseSortBy(payload.sortBy);

        return await this.pos.findAndCountAll({
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
