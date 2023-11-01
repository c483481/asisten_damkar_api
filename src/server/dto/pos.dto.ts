import { BaseResult, UserSession } from "../../module/dto.module";

export interface PosCreation_Payload {
    name: string;
    lat: number;
    lng: number;
    userSession: UserSession;
}

export interface PosResult extends BaseResult {
    name: string;
    location: {
        lat: number;
        lng: number;
    };
    active: boolean;
}
