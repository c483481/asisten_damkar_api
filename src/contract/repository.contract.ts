import { FindResult, List_Payload } from "../module/dto.module";
import { FireLocationAttributes, FireLocationCreationAttributes } from "../server/model/fire-location.model";
import { ItemsAttributes, ItemsCreationAttributes } from "../server/model/items.model";
import { PosAttributes, PosCreationAttributes, PosJoinAttributes } from "../server/model/pos.model";
import { TruckAttribute, TruckCreationsAttributes, TruckJoinAttributes } from "../server/model/truck.model";
import { UsersAttributes, UsersCreationAttributes } from "../server/model/users.model";

export interface AppRepositoryMap {
    users: UsersRepository;
    pos: PosRepository;
    truck: TruckRepository;
    items: ItemsRepository;
    fireLocation: FireLocationRepository;
}

export interface UsersRepository {
    insertUsers(payload: UsersCreationAttributes): Promise<UsersAttributes>;

    findByUsername(username: string): Promise<UsersAttributes | null>;

    findByXid(xid: string): Promise<UsersAttributes | null>;
}

export interface PosRepository {
    insertPos(payload: PosCreationAttributes): Promise<PosAttributes>;

    listPos(payload: List_Payload): Promise<FindResult<PosAttributes>>;

    findByXid(xid: string): Promise<PosAttributes | null>;

    findByXidJoin(xid: string): Promise<PosJoinAttributes | null>;
}

export interface TruckRepository {
    insertTruck(payload: TruckCreationsAttributes): Promise<TruckAttribute>;

    listTruck(payload: List_Payload): Promise<FindResult<TruckAttribute>>;

    findByXid(xid: string): Promise<TruckAttribute | null>;

    findByXidJoin(xid: string): Promise<TruckJoinAttributes | null>;
}

export interface ItemsRepository {
    insertItems(payload: ItemsCreationAttributes): Promise<ItemsAttributes>;
}

export interface FireLocationRepository {
    insertFireLocation(payload: FireLocationCreationAttributes): Promise<FireLocationAttributes>;

    listFireLocation(payload: List_Payload): Promise<FindResult<FireLocationAttributes>>;
}
