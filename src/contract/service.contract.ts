import { GetDetail_Payload, ListResult, List_Payload } from "../module/dto.module";
import { LoginResult, Login_Payload, RefreshTokenResult, Register_Payload } from "../server/dto/auth.dto";
import { FireLocationCreation_Payload, FireLocationResult } from "../server/dto/fire-location.dto";
import { ItemsCreation_Attribute, ItemsResult } from "../server/dto/items.dto";
import { PemadamCreation_Payload, PemadamResult } from "../server/dto/pemadam.dto";
import { PosCreation_Payload, PosJoinResult, PosResult } from "../server/dto/pos.dto";
import { TruckCreation_Payload, TruckJoinResult, TruckResult } from "../server/dto/truck.dto";
import { UsersResult } from "../server/dto/users.dto";

export interface AppServiceMap {
    auth: AuthService;
    pos: PosService;
    truck: TruckService;
    fireLocation: FireLocationService;
    pemadam: PemadamService;
    items: ItemsService;
}

export interface AuthService {
    register(payload: Register_Payload): Promise<UsersResult>;

    login(payload: Login_Payload): Promise<LoginResult>;

    refreshToken(xid: string): Promise<RefreshTokenResult>;
}

export interface PosService {
    createPos(payload: PosCreation_Payload): Promise<PosResult>;

    findPos(payload: List_Payload): Promise<ListResult<PosResult>>;

    getDetailPos(payload: GetDetail_Payload): Promise<PosJoinResult>;
}

export interface TruckService {
    createTruck(payload: TruckCreation_Payload): Promise<TruckResult>;

    findTruck(payload: List_Payload): Promise<ListResult<TruckResult>>;

    createItemsTruck(payload: ItemsCreation_Attribute): Promise<ItemsResult>;

    getDetailTruck(payload: GetDetail_Payload): Promise<TruckJoinResult>;
}

export interface FireLocationService {
    createFireLocation(posXid: FireLocationCreation_Payload): Promise<FireLocationResult>;

    getListFireLocation(payload: List_Payload): Promise<ListResult<FireLocationResult>>;

    updateFireLocation(payload: GetDetail_Payload): Promise<FireLocationResult>;
}

export interface PemadamService {
    createPemadam(payload: PemadamCreation_Payload): Promise<PemadamResult>;

    getPemadamInfo(userXid: string): Promise<PemadamResult>;
}

export interface ItemsService {
    updateStatusItem(payload: GetDetail_Payload): Promise<ItemsResult>;
}
