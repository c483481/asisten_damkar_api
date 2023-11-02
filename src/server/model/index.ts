import { Sequelize } from "sequelize";
import { Users } from "./users.model";
import { Pos } from "./pos.model";
import { Truck } from "./truck.model";

export interface AppSqlModel {
    Users: typeof Users;
    Pos: typeof Pos;
    Truck: typeof Truck;
}

export function initSqlModels(sequelize: Sequelize): AppSqlModel {
    Users.initModels(sequelize);
    Pos.initModels(sequelize);
    Truck.initModels(sequelize);

    return {
        Users,
        Pos,
        Truck,
    };
}
