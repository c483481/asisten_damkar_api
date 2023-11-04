import { CommonColumn } from "../../module/default.module";
import { ModifiedBy } from "../../module/dto.module";
import { BaseSequelizeAttribute, optionalSequelize } from "./common.model";
import { Optional, Sequelize, Model, DataTypes } from "sequelize";
import { Pos } from "./pos.model";

const { id, xid, version, modifiedBy, updatedAt, createdAt } = CommonColumn;

export interface FireLocationAttributes extends BaseSequelizeAttribute {
    posId: number;
}

export interface FireLocationJoinAttributes extends FireLocationAttributes {
    Pos?: Pos;
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
            },
            {
                sequelize,
                tableName: "fire_location",
                timestamps: false,
            }
        );
    }
}
