import { isValid } from "ulidx";
import { AppRepositoryMap, PosRepository } from "../../contract/repository.contract";
import { PosService } from "../../contract/service.contract";
import { GetDetail_Payload, ListResult, List_Payload } from "../../module/dto.module";
import { compose, composeResult, createData } from "../../utils/helper.utils";
import { PosCreation_Payload, PosJoinResult, PosResult } from "../dto/pos.dto";
import { PosAttributes, PosCreationAttributes, PosJoinAttributes } from "../model/pos.model";
import { BaseService } from "./base.service";
import { errorResponses } from "../../response";
import { composeTruck } from "./truck.service";

export class Pos extends BaseService implements PosService {
    private posRepo!: PosRepository;
    init(repository: AppRepositoryMap): void {
        this.posRepo = repository.pos;
    }

    createPos = async (payload: PosCreation_Payload): Promise<PosResult> => {
        const { lat, lng, userSession, name } = payload;
        const createdValues = createData<PosCreationAttributes>(
            {
                name,
                latitude: lat,
                longitude: lng,
                active: true,
            },
            userSession
        );

        const result = await this.posRepo.insertPos(createdValues);

        return composePos(result);
    };

    findPos = async (payload: List_Payload): Promise<ListResult<PosResult>> => {
        const result = await this.posRepo.listPos(payload);

        const items = compose(result.rows, composePos);

        return {
            items,
            count: result.count,
        };
    };

    getDetailPos = async (payload: GetDetail_Payload): Promise<PosJoinResult> => {
        const { xid } = payload;

        if (!isValid(xid)) {
            throw errorResponses.getError("E_FOUND_1");
        }

        const result = await this.posRepo.findByXidJoin(xid);

        if (!result) {
            throw errorResponses.getError("E_FOUND_1");
        }

        return composeJoinPos(result);
    };
}

export function composePos(row: PosAttributes): PosResult {
    return composeResult<PosAttributes, PosResult>(row, {
        name: row.name,
        location: {
            lat: row.latitude,
            lng: row.longitude,
        },
        active: row.active,
    });
}

function composeJoinPos(row: PosJoinAttributes): PosJoinResult {
    return composeResult<PosAttributes, PosJoinResult>(row, {
        name: row.name,
        location: {
            lat: row.latitude,
            lng: row.longitude,
        },
        active: row.active,
        truck: row.Trucks ? compose(row.Trucks, composeTruck) : [],
    });
}
