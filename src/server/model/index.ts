import { Sequelize } from "sequelize";
import { Users } from "./users.model";
import { Pos } from "./pos.model";
import { Truck } from "./truck.model";
import { Items } from "./items.model";
import { FireLocation } from "./fire-location.model";
import { Pemadam } from "./pemadam.model";

export interface AppSqlModel {
    Users: typeof Users;
    Pos: typeof Pos;
    Truck: typeof Truck;
    Items: typeof Items;
    FireLocation: typeof FireLocation;
    Pemadam: typeof Pemadam;
}

export function initSqlModels(sequelize: Sequelize): AppSqlModel {
    Users.initModels(sequelize);
    Pos.initModels(sequelize);
    Truck.initModels(sequelize);
    Items.initModels(sequelize);
    FireLocation.initModels(sequelize);
    Pemadam.initModels(sequelize);

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

    FireLocation.belongsTo(Pos, {
        targetKey: "id",
        foreignKey: "posId",
    });

    Pos.hasMany(FireLocation, {
        sourceKey: "id",
        foreignKey: "posId",
    });

    Truck.hasOne(Pemadam, {
        sourceKey: "id",
        foreignKey: "truckId",
    });

    Pemadam.belongsTo(Truck, {
        targetKey: "id",
        foreignKey: "truckId",
    });

    Pos.hasMany(Pemadam, {
        sourceKey: "id",
        foreignKey: "oisId",
    });

    Pemadam.belongsTo(Pos, {
        targetKey: "id",
        foreignKey: "posId",
    });

    return {
        Users,
        Pos,
        Truck,
        Items,
        FireLocation,
        Pemadam,
    };
}
