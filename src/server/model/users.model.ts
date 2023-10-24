import { Optional, Model, DataTypes, Sequelize } from "sequelize";
import { BaseSequelizeAttribute, optionalSequelize } from "./common.model";
import { CommonColumn } from "../../module/default.module";
import { ModifiedBy } from "../../module/dto.module";

const { id, xid, version, modifiedBy, updatedAt, createdAt } = CommonColumn;

export interface UsersAttributes extends BaseSequelizeAttribute {
    username: string;
    password: string;
    role: string;
}

export type UsersCreationAttributes = Optional<UsersAttributes, optionalSequelize>;

export class Users extends Model<UsersAttributes, UsersCreationAttributes> implements UsersAttributes {
    xid!: string;
    updatedAt!: Date;
    createdAt!: Date;
    modifiedBy!: ModifiedBy;
    version!: number;
    id!: number;

    username!: string;
    password!: string;
    role!: string;

    static initModels(sequelize: Sequelize): typeof Users {
        return Users.init(
            {
                id,
                xid,
                version,
                modifiedBy,
                updatedAt,
                createdAt,
                username: {
                    type: DataTypes.STRING(255),
                    allowNull: false,
                    unique: true,
                },
                password: {
                    type: DataTypes.STRING(255),
                    allowNull: false,
                },
                role: {
                    type: DataTypes.STRING(5),
                    allowNull: false,
                },
            },
            {
                sequelize,
                tableName: "users",
                timestamps: false,
            }
        );
    }
}
