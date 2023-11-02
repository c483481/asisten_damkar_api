import { BaseResult, UserSession } from "../../module/dto.module";
import { ItemsResult } from "./items.dto";

export interface TruckCreation_Payload {
    posXid: string;
    plat: string;
    userSession: UserSession;
}

export interface TruckResult extends BaseResult {
    posXid: string;
    plat: string;
    active: boolean;
}

export interface TruckJoinResult extends TruckResult {
    items: ItemsResult[];
}
