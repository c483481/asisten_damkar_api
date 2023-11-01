import { BaseResult } from "../../module/dto.module";

export interface PosCreation_Payload {
    lat: number;
    lng: number;
}

export interface PosResult extends BaseResult {
    location: {
        lat: number;
        lng: number;
    };
}
