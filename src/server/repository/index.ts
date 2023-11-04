import {
    AppRepositoryMap,
    FireLocationRepository,
    ItemsRepository,
    PosRepository,
    TruckRepository,
    UsersRepository,
} from "../../contract/repository.contract";
import { AppDataSource } from "../../module/datasource.module";
import { BaseRepository } from "./base.repository";
import { SequelizeFireLocationRepository } from "./fire-location.repository";
import { SequelizeItemsRepository } from "./items.repository";
import { SequelizePosRepository } from "./pos.repository";
import { SequelizeTruckRepository } from "./truck.repository";
import { SequelizeUsersRepository } from "./users.repository";

export class Repository implements AppRepositoryMap {
    readonly users: UsersRepository = new SequelizeUsersRepository();
    readonly pos: PosRepository = new SequelizePosRepository();
    readonly truck: TruckRepository = new SequelizeTruckRepository();
    readonly items: ItemsRepository = new SequelizeItemsRepository();
    readonly fireLocation: FireLocationRepository = new SequelizeFireLocationRepository();

    init(datasource: AppDataSource) {
        Object.entries(this).forEach(([k, r]) => {
            if (r instanceof BaseRepository) {
                r.init(datasource);
                console.log(`initiate repository ${k}`);
            }
        });
    }
}
