import { ItemsRepository } from "../../contract/repository.contract";
import { AppDataSource } from "../../module/datasource.module";
import { Items, ItemsAttributes, ItemsCreationAttributes } from "../model/items.model";
import { BaseRepository } from "./base.repository";

export class SequelizeItemsRepository extends BaseRepository implements ItemsRepository {
    private items!: typeof Items;

    init(datasource: AppDataSource): void {
        this.items = datasource.sqlModel.Items;
    }

    insertItems = async (payload: ItemsCreationAttributes): Promise<ItemsAttributes> => {
        return this.items.create(payload);
    };

    findByXid = async (xid: string): Promise<ItemsAttributes | null> => {
        return this.items.findOne({
            where: {
                xid,
            },
        });
    };

    updateItems = async (id: number, payload: Partial<ItemsAttributes>, version: number): Promise<number> => {
        const result = await this.items.update(payload, {
            where: {
                id,
                version,
            },
        });

        return result[0];
    };

    deleteItems = async (id: number): Promise<number> => {
        return this.items.destroy({
            where: {
                id,
            },
        });
    };
}
