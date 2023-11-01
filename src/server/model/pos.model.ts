import { CommonColumn } from "../../module/default.module";
import { ModifiedBy } from "../../module/dto.module";
import { BaseSequelizeAttribute, optionalSequelize } from "./common.model";
import { Optional, DataTypes, Model, Sequelize } from "sequelize";

const { id, xid, version, modifiedBy, updatedAt, createdAt } = CommonColumn;

export interface PosAttributes extends BaseSequelizeAttribute {
    name: string;
    latitude: number;
    longitude: number;
    active: boolean;
}

export type PosCreationAttributes = Optional<PosAttributes, optionalSequelize>;

export class Pos extends Model<PosAttributes, PosCreationAttributes> implements PosAttributes {
    xid!: string;
    updatedAt!: Date;
    createdAt!: Date;
    modifiedBy!: ModifiedBy;
    version!: number;
    id!: number;

    name!: string;
    latitude!: number;
    longitude!: number;
    active!: boolean;

    static initModels(sequelize: Sequelize): typeof Pos {
        return Pos.init(
            {
                id,
                xid,
                version,
                modifiedBy,
                updatedAt,
                createdAt,
                name: {
                    type: DataTypes.STRING,
                    allowNull: false,
                    unique: true,
                },
                latitude: {
                    type: DataTypes.DOUBLE,
                    allowNull: false,
                },
                longitude: {
                    type: DataTypes.DOUBLE,
                    allowNull: false,
                },
                active: {
                    type: DataTypes.BOOLEAN,
                    allowNull: false,
                },
            },
            {
                sequelize,
                tableName: "pos",
                timestamps: false,
            }
        );
    }
}
