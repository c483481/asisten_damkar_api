import { Sequelize } from "sequelize";
import { Users } from "./users.model";
import { Pos } from "./pos.model";
import { Truck } from "./truck.model";
import { Items } from "./items.model";

export interface AppSqlModel {
    Users: typeof Users;
    Pos: typeof Pos;
    Truck: typeof Truck;
    Items: typeof Items;
}

export function initSqlModels(sequelize: Sequelize): AppSqlModel {
    Users.initModels(sequelize);
    Pos.initModels(sequelize);
    Truck.initModels(sequelize);
    Items.initModels(sequelize);

    Truck.hasMany(Items, {
        sourceKey: "id",
        foreignKey: "truckId",
    });

    Items.belongsTo(Truck, {
        targetKey: "id",
        foreignKey: "truckId",
    });

    Pos.hasMany(Truck, {
        sourceKey: "id",
        foreignKey: "posId",
    });

    Truck.belongsTo(Pos, {
        targetKey: "id",
        foreignKey: "posId",
    });

    return {
        Users,
        Pos,
        Truck,
        Items,
    };
}
