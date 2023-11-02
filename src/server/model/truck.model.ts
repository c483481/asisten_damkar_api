import { CommonColumn } from "../../module/default.module";
import { ModifiedBy } from "../../module/dto.module";
import { BaseSequelizeAttribute, optionalSequelize } from "./common.model";
import { Optional, Model, DataTypes, Sequelize } from "sequelize";
import { Items } from "./items.model";

const { id, xid, version, modifiedBy, updatedAt, createdAt } = CommonColumn;

export interface TruckAttribute extends BaseSequelizeAttribute {
    posXid: string;
    plat: string;
    active: boolean;
}

export interface TruckJoinAttributes extends TruckAttribute {
    Items?: Items[];
}

export type TruckCreationsAttributes = Optional<TruckAttribute, optionalSequelize>;

export class Truck extends Model<TruckAttribute, TruckCreationsAttributes> implements TruckAttribute {
    xid!: string;
    updatedAt!: Date;
    createdAt!: Date;
    modifiedBy!: ModifiedBy;
    version!: number;
    id!: number;

    posXid!: string;
    plat!: string;
    active!: boolean;

    static initModels(sequelize: Sequelize): typeof Truck {
        return Truck.init(
            {
                id,
                xid,
                version,
                modifiedBy,
                updatedAt,
                createdAt,
                posXid: {
                    type: DataTypes.STRING,
                    allowNull: false,
                },
                plat: {
                    type: DataTypes.STRING,
                    allowNull: false,
                    unique: true,
                },
                active: {
                    type: DataTypes.BOOLEAN,
                    allowNull: false,
                },
            },
            {
                sequelize,
                tableName: "truck",
                timestamps: false,
            }
        );
    }
}
