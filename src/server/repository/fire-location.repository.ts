import { pubsubEvent } from "../../constant/pubsub.contstant";
import { FireLocationRepository } from "../../contract/repository.contract";
import { AppDataSource } from "../../module/datasource.module";
import { FindResult, List_Payload } from "../../module/dto.module";
import { pubSub } from "../../module/pubsub.modul";
import { FireLocationResult } from "../dto/fire-location.dto";
import { FireLocation, FireLocationAttributes, FireLocationCreationAttributes } from "../model/fire-location.model";
import { Pos } from "../model/pos.model";
import { BaseRepository } from "./base.repository";
import { Includeable, Op, Order, WhereOptions } from "sequelize";

export class SequelizeFireLocationRepository extends BaseRepository implements FireLocationRepository {
    private fireLocation!: typeof FireLocation;
    init(datasource: AppDataSource): void {
        this.fireLocation = datasource.sqlModel.FireLocation;
    }

    insertFireLocation = async (payload: FireLocationCreationAttributes): Promise<FireLocationAttributes> => {
        return this.fireLocation.create(payload);
    };

    findByXid = async (xid: string): Promise<FireLocationAttributes | null> => {
        return this.fireLocation.findOne({
            where: {
                xid,
            },
        });
    };

    listFireLocation = async (payload: List_Payload): Promise<FindResult<FireLocationAttributes>> => {
        // retrieve options
        const { showAll, filters } = payload;

        // prepare find options
        let limit: number | undefined = undefined;
        let offset: number | undefined = undefined;

        if (!showAll) {
            limit = payload.limit;
            offset = payload.skip;
        }

        const where: WhereOptions<FireLocationAttributes> = {};

        if (filters.status) {
            where.status = filters.status;
        }

        if (filters.nullArriveAt) {
            where.arriveAt = {
                [Op.ne]: null,
            };
        }

        let includeAble: Includeable = { model: Pos };

        if (filters.posXid) {
            includeAble = {
                model: Pos,
                where: {
                    xid: filters.posXid,
                },
            };
        }

        // parsing sort option
        const { order } = this.parseSortBy(payload.sortBy);

        return await this.fireLocation.findAndCountAll({
            where,
            offset,
            include: includeAble,
            limit,
            order,
        });
    };

    updateFireLocation = async (
        id: number,
        updatedValues: Partial<FireLocationAttributes>,
        version: number
    ): Promise<number> => {
        const result = await this.fireLocation.update(updatedValues, { where: { id, version } });

        return result[0];
    };

    triggerPushFireLocation = (payload: FireLocationResult): void => {
        pubSub.publish(pubsubEvent.pushFireLocation, payload);
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
