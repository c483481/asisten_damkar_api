import { CommonColumn } from "../../module/default.module";
import { ModifiedBy } from "../../module/dto.module";
import { BaseSequelizeAttribute, optionalSequelize } from "./common.model";
import { Optional, Model, DataTypes, Sequelize } from "sequelize";
import { Truck } from "./truck.model";

const { id, xid, version, modifiedBy, updatedAt, createdAt } = CommonColumn;

export interface ItemsAttributes extends BaseSequelizeAttribute {
    truckId: number;
    name: string;
    active: boolean;
}

export type ItemsCreationAttributes = Optional<ItemsAttributes, optionalSequelize>;

export class Items extends Model<ItemsAttributes, ItemsCreationAttributes> implements ItemsAttributes {
    xid!: string;
    updatedAt!: Date;
    createdAt!: Date;
    modifiedBy!: ModifiedBy;
    version!: number;
    id!: number;

    truckId!: number;
    name!: string;
    active!: boolean;

    static initModels(sequelize: Sequelize): typeof Items {
        return Items.init(
            {
                id,
                xid,
                version,
                modifiedBy,
                updatedAt,
                createdAt,
                truckId: {
                    type: DataTypes.BIGINT,
                    allowNull: false,
                    references: {
                        model: Truck,
                        key: "id",
                    },
                },
                name: {
                    type: DataTypes.STRING,
                    allowNull: false,
                },
                active: {
                    type: DataTypes.BOOLEAN,
                    allowNull: false,
                },
            },
            {
                sequelize,
                tableName: "items",
                timestamps: false,
            }
        );
    }
}
