import { BaseResult, UserSession } from "../../module/dto.module";

export interface ItemsCreation_Attribute {
    truckXid: string;
    name: string;
    userSession: UserSession;
}

export interface ItemsResult extends BaseResult {
    name: string;
    active: boolean;
}
