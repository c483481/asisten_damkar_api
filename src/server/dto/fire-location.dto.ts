import { BaseResult, UserSession } from "../../module/dto.module";
import { PosResult } from "./pos.dto";

export interface FireLocationResult extends BaseResult {
    pos: PosResult | null;
    lat: number;
    lng: number;
    active: boolean;
}

export interface FireLocationCreation_Payload {
    posXid: string;
    lat: number;
    lng: number;
    userSession: UserSession;
}
