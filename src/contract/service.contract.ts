import { ListResult, List_Payload } from "../module/dto.module";
import { LoginResult, Login_Payload, RefreshTokenResult, Register_Payload } from "../server/dto/auth.dto";
import { PosCreation_Payload, PosResult } from "../server/dto/pos.dto";
import { UsersResult } from "../server/dto/users.dto";

export interface AppServiceMap {
    auth: AuthService;
    pos: PosService;
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
