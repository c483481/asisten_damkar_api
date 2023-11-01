import { PosRepository } from "../../contract/repository.contract";
import { AppDataSource } from "../../module/datasource.module";
import { Pos, PosAttributes, PosCreationAttributes } from "../model/pos.model";
import { BaseRepository } from "./base.repository";

export class SequelizePosRepository extends BaseRepository implements PosRepository {
    private pos!: typeof Pos;

    init(datasource: AppDataSource): void {
        this.pos = datasource.sqlModel.Pos;
    }

    insertPos = async (payload: PosCreationAttributes): Promise<PosAttributes> => {
        return this.pos.create(payload);
    };
}
