import { GetDetail_Payload, ListResult, List_Payload } from "../module/dto.module";
import { LoginResult, Login_Payload, RefreshTokenResult, Register_Payload } from "../server/dto/auth.dto";
import { ItemsCreation_Attribute, ItemsResult } from "../server/dto/items.dto";
import { PosCreation_Payload, PosResult } from "../server/dto/pos.dto";
import { TruckCreation_Payload, TruckJoinResult, TruckResult } from "../server/dto/truck.dto";
import { UsersResult } from "../server/dto/users.dto";

export interface AppServiceMap {
    auth: AuthService;
    pos: PosService;
    truck: TruckService;
}

export interface AuthService {
    register(payload: Register_Payload): Promise<UsersResult>;

    login(payload: Login_Payload): Promise<LoginResult>;

    refreshToken(xid: string): Promise<RefreshTokenResult>;
}

export interface PosService {
    createPos(payload: PosCreation_Payload): Promise<PosResult>;

    findPos(payload: List_Payload): Promise<ListResult<PosResult>>;
}

export interface TruckService {
    createTruck(payload: TruckCreation_Payload): Promise<TruckResult>;

    findTruck(payload: List_Payload): Promise<ListResult<TruckResult>>;

    createItemsTruck(payload: ItemsCreation_Attribute): Promise<ItemsResult>;

    getDetailTruck(payload: GetDetail_Payload): Promise<TruckJoinResult>;
}
