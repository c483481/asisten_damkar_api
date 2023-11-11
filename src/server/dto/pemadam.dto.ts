import { BaseResult } from "../../module/dto.module";
import { PosResult } from "./pos.dto";
import { TruckResult } from "./truck.dto";

export interface PemadamCreation_Payload {
    posXid: string;
    truckXid: string;
    userXid: string;
}

export interface PemadamResult extends BaseResult {
    pos: PosResult | null;
    truck: TruckResult | null;
}
