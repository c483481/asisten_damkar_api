import { Token } from "../../module/dto.module";
import { UsersResult } from "./users.dto";

export interface Register_Payload {
    username: string;
    password: string;
    role: string;
}

export interface Login_Payload {
    username: string;
    password: string;
}

export interface LoginResult extends UsersResult {
    key: {
        accessToken: Token;
        refreshToken: Token;
    };
}
