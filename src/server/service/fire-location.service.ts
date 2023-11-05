import { isValid } from "ulidx";
import { AppRepositoryMap, FireLocationRepository, PosRepository } from "../../contract/repository.contract";
import { BaseService } from "./base.service";
import { errorResponses } from "../../response";
import { composeResult, createData } from "../../utils/helper.utils";
import { FireLocationCreationAttributes, FireLocationJoinAttributes } from "../model/fire-location.model";
import { FireLocationCreation_Payload, FireLocationResult } from "../dto/fire-location.dto";
import { composePos } from "./pos.service";
import { getStatus, statusConstant } from "../../constant/status.constant";

export class FireLocation extends BaseService {
    private fireLocationRepo!: FireLocationRepository;
    private posRepo!: PosRepository;
    init(repository: AppRepositoryMap): void {
        this.fireLocationRepo = repository.fireLocation;
        this.posRepo = repository.pos;
    }

    createFireLocation = async (payload: FireLocationCreation_Payload): Promise<FireLocationResult> => {
        const { posXid, lat, lng, userSession } = payload;
        if (!isValid(posXid)) {
            throw errorResponses.getError("E_FOUND_1");
        }

        const pos = await this.posRepo.findByXid(posXid);

        if (!pos) {
            throw errorResponses.getError("E_FOUND_1");
        }

        const createdValues = createData<FireLocationCreationAttributes>(
            {
                latitude: lat,
                longitude: lng,
                posId: pos.id,
                status: statusConstant.onGoing,
            },
            userSession
        );

        const result = (await this.fireLocationRepo.insertFireLocation(createdValues)) as FireLocationJoinAttributes;

        result.Pos = pos;

        return composeFireLocation(result);
    };
}

export function composeFireLocation(row: FireLocationJoinAttributes): FireLocationResult {
    return composeResult<FireLocationJoinAttributes, FireLocationResult>(row, {
        pos: row.Pos ? composePos(row.Pos) : null,
        lat: row.latitude,
        lng: row.longitude,
        status: getStatus(row.status),
    });
}
