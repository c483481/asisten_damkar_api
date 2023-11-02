import { isValid } from "ulidx";
import { AppRepositoryMap, ItemsRepository, PosRepository, TruckRepository } from "../../contract/repository.contract";
import { compose, composeResult, createData } from "../../utils/helper.utils";
import { TruckCreation_Payload, TruckJoinResult, TruckResult } from "../dto/truck.dto";
import { TruckAttribute, TruckCreationsAttributes, TruckJoinAttributes } from "../model/truck.model";
import { BaseService } from "./base.service";
import { errorResponses } from "../../response";
import { TruckService } from "../../contract/service.contract";
import { GetDetail_Payload, ListResult, List_Payload } from "../../module/dto.module";
import { ItemsCreation_Attribute, ItemsResult } from "../dto/items.dto";
import { ItemsAttributes, ItemsCreationAttributes } from "../model/items.model";

export class Truck extends BaseService implements TruckService {
    private truckRepo!: TruckRepository;
    private posRepo!: PosRepository;
    private itemsRepo!: ItemsRepository;

    init(repository: AppRepositoryMap): void {
        this.truckRepo = repository.truck;
        this.posRepo = repository.pos;
        this.itemsRepo = repository.items;
    }

    getDetailTruck = async (payload: GetDetail_Payload): Promise<TruckJoinResult> => {
        const { xid } = payload;

        if (!isValid(xid)) {
            throw errorResponses.getError("E_FOUND_1");
        }

        const result = await this.truckRepo.findByXidJoin(xid);

        if (!result) {
            throw errorResponses.getError("E_FOUND_1");
        }

        return composeJoinTruck(result);
    };

    createItemsTruck = async (payload: ItemsCreation_Attribute): Promise<ItemsResult> => {
        const { name, userSession, truckXid } = payload;

        if (!isValid(truckXid)) {
            throw errorResponses.getError("E_FOUND_1");
        }

        const truck = await this.truckRepo.findByXid(truckXid);

        if (!truck) {
            throw errorResponses.getError("E_FOUND_1");
        }

        const createdValues = createData<ItemsCreationAttributes>(
            {
                truckId: truck.id,
                name,
                active: true,
            },
            userSession
        );

        const result = await this.itemsRepo.insertItems(createdValues);

        return composeItems(result);
    };

    createTruck = async (payload: TruckCreation_Payload) => {
        const { plat, posXid, userSession } = payload;

        if (!isValid(posXid)) {
            throw errorResponses.getError("E_FOUND_1");
        }

        const pos = await this.posRepo.findByXid(posXid);

        if (!pos) {
            throw errorResponses.getError("E_FOUND_1");
        }

        const createdValues = createData<TruckCreationsAttributes>(
            {
                plat,
                posId: pos.id,
                active: true,
            },
            userSession
        );

        const result = await this.truckRepo.insertTruck(createdValues);

        return composeTruck(result);
    };

    findTruck = async (payload: List_Payload): Promise<ListResult<TruckResult>> => {
        const result = await this.truckRepo.listTruck(payload);

        const items = compose(result.rows, composeTruck);

        return {
            items,
            count: result.count,
        };
    };
}

export function composeTruck(row: TruckAttribute): TruckResult {
    return composeResult<TruckAttribute, TruckResult>(row, {
        plat: row.plat,
        active: row.active,
    });
}

export function composeItems(row: ItemsAttributes): ItemsResult {
    return composeResult<ItemsAttributes, ItemsResult>(row, {
        name: row.name,
        active: row.active,
    });
}

function composeJoinTruck(row: TruckJoinAttributes): TruckJoinResult {
    return composeResult<TruckAttribute, TruckJoinResult>(row, {
        plat: row.plat,
        active: row.active,
        items: row.Items ? compose(row.Items, composeItems) : [],
    });
}
