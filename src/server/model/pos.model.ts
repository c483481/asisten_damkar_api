import { CommonColumn } from "../../module/default.module";
import { ModifiedBy, Point } from "../../module/dto.module";
import { BaseSequelizeAttribute, optionalSequelize } from "./common.model";
import { Optional, DataTypes, Model, Sequelize } from "sequelize";

const { id, xid, version, modifiedBy, updatedAt, createdAt } = CommonColumn;

export interface PosAttributes extends BaseSequelizeAttribute {
    name: string;
    location: Point;
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
    location!: Point;
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
                location: {
                    type: DataTypes.GEOMETRY("POINT"),
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
