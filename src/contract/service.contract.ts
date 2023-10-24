import { Register_Payload } from "../server/dto/auth.dto";
import { UsersResult } from "../server/dto/users.dto";

export interface AppServiceMap {
    auth: AuthService;
}

export interface AuthService {
    register(payload: Register_Payload): Promise<UsersResult>;
}
