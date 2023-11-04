import { FireLocationRepository } from "../../contract/repository.contract";
import { AppDataSource } from "../../module/datasource.module";
import { FireLocation, FireLocationAttributes, FireLocationCreationAttributes } from "../model/fire-location.model";
import { BaseRepository } from "./base.repository";

export class SequelizeFireLocationRepository extends BaseRepository implements FireLocationRepository {
    private fireLocation!: typeof FireLocation;
    init(datasource: AppDataSource): void {
        this.fireLocation = datasource.sqlModel.FireLocation;
    }

    insertFireLocation = async (payload: FireLocationCreationAttributes): Promise<FireLocationAttributes> => {
        return this.fireLocation.create(payload);
    };
}
