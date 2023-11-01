import { CommonColumn } from "../../module/default.module";
import { ModifiedBy, Point } from "../../module/dto.module";
import { BaseSequelizeAttribute, optionalSequelize } from "./common.model";
import { Optional, DataTypes, Model, Sequelize } from "sequelize";

const { id, xid, version, modifiedBy, updatedAt, createdAt } = CommonColumn;

export interface PosAttributes extends BaseSequelizeAttribute {
    location: Point;
}

export type PosCreationAttributes = Optional<PosAttributes, optionalSequelize>;

export class Pos extends Model<PosAttributes, PosCreationAttributes> implements PosAttributes {
    xid!: string;
    updatedAt!: Date;
    createdAt!: Date;
    modifiedBy!: ModifiedBy;
    version!: number;
    id!: number;

    location!: Point;

    static initModels(sequelize: Sequelize): typeof Pos {
        return Pos.init(
            {
                id,
                xid,
                version,
                modifiedBy,
                updatedAt,
                createdAt,
                location: {
                    type: DataTypes.GEOMETRY("POINT"),
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
