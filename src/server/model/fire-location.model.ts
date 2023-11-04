import { CommonColumn } from "../../module/default.module";
import { ModifiedBy } from "../../module/dto.module";
import { BaseSequelizeAttribute, optionalSequelize } from "./common.model";
import { Optional, Sequelize, Model, DataTypes } from "sequelize";
import { Pos, PosAttributes } from "./pos.model";

const { id, xid, version, modifiedBy, updatedAt, createdAt } = CommonColumn;

export interface FireLocationAttributes extends BaseSequelizeAttribute {
    posId: number;
    latitude: number;
    longitude: number;
    active: boolean;
}

export interface FireLocationJoinAttributes extends FireLocationAttributes {
    Pos?: PosAttributes;
}

export type FireLocationCreationAttributes = Optional<FireLocationAttributes, optionalSequelize>;

export class FireLocation
    extends Model<FireLocationAttributes, FireLocationCreationAttributes>
    implements FireLocationAttributes
{
    xid!: string;
    updatedAt!: Date;
    createdAt!: Date;
    modifiedBy!: ModifiedBy;
    version!: number;
    id!: number;

    posId!: number;
    latitude!: number;
    longitude!: number;
    active!: boolean;

    static initModels(sequelize: Sequelize): typeof FireLocation {
        return FireLocation.init(
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
                    defaultValue: true,
                },
            },
            {
                sequelize,
                tableName: "fire_location",
                timestamps: false,
            }
        );
    }
}
