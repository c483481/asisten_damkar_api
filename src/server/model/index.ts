import { Sequelize } from "sequelize";
import { Users } from "./users.model";
import { Pos } from "./pos.model";

export interface AppSqlModel {
    Users: typeof Users;
    Pos: typeof Pos;
}

export function initSqlModels(sequelize: Sequelize): AppSqlModel {
    Users.initModels(sequelize);
    Pos.initModels(sequelize);

    return {
        Users,
        Pos,
    };
}
