import { BaseResult } from "../../module/dto.module";
import { PosResult } from "./pos.dto";

export interface FireLocationResult extends BaseResult {
    pos: PosResult | null;
}
