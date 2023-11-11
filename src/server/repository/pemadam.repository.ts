import { PemadamRepository } from "../../contract/repository.contract";
import { AppDataSource } from "../../module/datasource.module";
import { Pemadam, PemadamAttributes, PemadamCreationAttributes } from "../model/pemadam.model";
import { BaseRepository } from "./base.repository";

export class SequelizePemadamRepository extends BaseRepository implements PemadamRepository {
    private pemadam!: typeof Pemadam;
    init(datasource: AppDataSource): void {
        this.pemadam = datasource.sqlModel.Pemadam;
    }

    insertPemadam = async (payload: PemadamCreationAttributes): Promise<PemadamAttributes> => {
        return this.pemadam.create(payload);
    };
}
