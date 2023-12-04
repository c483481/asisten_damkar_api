import { isValid } from "ulidx";
import { AppRepositoryMap, ItemsRepository } from "../../contract/repository.contract";
import { ItemsService } from "../../contract/service.contract";
import { GetDetail_Payload } from "../../module/dto.module";
import { ItemsResult } from "../dto/items.dto";
import { BaseService } from "./base.service";
import { errorResponses } from "../../response";
import { updateData } from "../../utils/helper.utils";
import { ItemsAttributes } from "../model/items.model";
import { composeItems } from "./truck.service";

export class Items extends BaseService implements ItemsService {
    private itemsRepo!: ItemsRepository;
    init(repository: AppRepositoryMap): void {
        this.itemsRepo = repository.items;
    }
    updateStatusItem = async (payload: GetDetail_Payload): Promise<ItemsResult> => {
        const { xid, usersSession } = payload;

        if (!isValid(xid)) {
            throw errorResponses.getError("E_FOUND_1");
        }

        const items = await this.itemsRepo.findByXid(xid);

        if (!items) {
            throw errorResponses.getError("E_FOUND_1");
        }

        const updatedValues = updateData<ItemsAttributes>(
            items,
            {
                active: !items.active,
            },
            usersSession
        );

        const result = await this.itemsRepo.updateItems(items.id, updatedValues, items.version);

        if (!result) {
            throw errorResponses.getError("E_ERR_1");
        }

        Object.assign(items, updatedValues);

        return composeItems(items);
    };

    deleteItems = async (payload: GetDetail_Payload): Promise<void> => {
        const { xid, usersSession } = payload;

        if (!isValid(xid)) {
            throw errorResponses.getError("E_FOUND_1");
        }

        const items = await this.itemsRepo.findByXid(xid);

        if (!items) {
            throw errorResponses.getError("E_FOUND_1");
        }

        const result = await this.itemsRepo.deleteItems(items.id);

        if (!result) {
            throw errorResponses.getError("E_FOUND_1");
        }
    };
}
