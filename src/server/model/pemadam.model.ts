import { CommonColumn } from "../../module/default.module";
import { ModifiedBy } from "../../module/dto.module";
import { BaseSequelizeAttribute, optionalSequelize } from "./common.model";
import { Optional, Sequelize, Model, DataTypes } from "sequelize";
import { Pos, PosAttributes } from "./pos.model";
import { Truck, TruckAttribute } from "./truck.model";

const { id, xid, version, modifiedBy, updatedAt, createdAt } = CommonColumn;

export interface PemadamAttributes extends BaseSequelizeAttribute {
    posId: number;
    truckId: number;
    userXid: string;
}

export interface PemadamJoinAttributes extends PemadamAttributes {
    Po?: PosAttributes;
    Truck?: TruckAttribute;
}

export type PemadamCreationAttributes = Optional<PemadamAttributes, optionalSequelize>;

export class Pemadam extends Model<PemadamAttributes, PemadamCreationAttributes> implements PemadamAttributes {
    xid!: string;
    updatedAt!: Date;
    createdAt!: Date;
    modifiedBy!: ModifiedBy;
    version!: number;
    id!: number;

    posId!: number;
    truckId!: number;
    userXid!: string;

    static initModels(sequelize: Sequelize): typeof Pemadam {
        return Pemadam.init(
            {
                id,
                xid,
                version,
                modifiedBy,
                updatedAt,
                createdAt,
                posId: {
                    type: DataTypes.BIGINT,
                    allowNull: false,
                    references: {
                        model: Pos,
                        key: "id",
                    },
                },
                truckId: {
                    type: DataTypes.BIGINT,
                    allowNull: false,
                    references: {
                        model: Truck,
                        key: "id",
                    },
                },
                userXid: {
                    type: DataTypes.STRING(26),
                    allowNull: false,
                    unique: true,
                },
            },
            {
                sequelize,
                tableName: "pemadam",
                timestamps: false,
            }
        );
    }
}
