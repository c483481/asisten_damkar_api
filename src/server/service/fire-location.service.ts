import { isValid } from "ulidx";
import { AppRepositoryMap, FireLocationRepository, PosRepository } from "../../contract/repository.contract";
import { BaseService } from "./base.service";
import { errorResponses } from "../../response";
import { compose, composeResult, createData, updateData } from "../../utils/helper.utils";
import {
    FireLocationAttributes,
    FireLocationCreationAttributes,
    FireLocationJoinAttributes,
} from "../model/fire-location.model";
import { FireLocationCreation_Payload, FireLocationResult } from "../dto/fire-location.dto";
import { composePos } from "./pos.service";
import { getStatus, statusConstant } from "../../constant/status.constant";
import { GetDetail_Payload, ListResult, List_Payload } from "../../module/dto.module";
import { FireLocationService } from "../../contract/service.contract";
import { toUnixEpoch } from "../../utils/date.utils";

export class FireLocation extends BaseService implements FireLocationService {
    private fireLocationRepo!: FireLocationRepository;
    private posRepo!: PosRepository;
    init(repository: AppRepositoryMap): void {
        this.fireLocationRepo = repository.fireLocation;
        this.posRepo = repository.pos;
    }

    updateFireLocation = async (payload: GetDetail_Payload): Promise<FireLocationResult> => {
        const { xid, usersSession } = payload;
        if (!isValid(xid)) {
            throw errorResponses.getError("E_REQ_1");
        }

        const fireLocation = await this.fireLocationRepo.findByXid(xid);

        if (!fireLocation) {
            throw errorResponses.getError("E_REQ_1");
        }

        const arriveAt = new Date();

        const fifteenMinutesInMilliseconds = 15 * 60 * 1000;

        const status =
            arriveAt.getTime() - fireLocation.createdAt.getTime() > fifteenMinutesInMilliseconds
                ? statusConstant.late
                : statusConstant.clear;

        const updatedValues = updateData<FireLocationAttributes>(
            fireLocation,
            {
                arriveAt,
                status,
            },
            usersSession
        );

        const result = await this.fireLocationRepo.updateFireLocation(
            fireLocation.id,
            updatedValues,
            fireLocation.version
        );

        if (!result) {
            throw errorResponses.getError("E_ERR_1");
        }

        Object.assign(fireLocation, updatedValues);

        return composeFireLocation(fireLocation);
    };

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
                arriveAt: null,
            },
            userSession
        );

        const result = (await this.fireLocationRepo.insertFireLocation(createdValues)) as FireLocationJoinAttributes;

        result.Po = pos;

        const resultCompose = composeFireLocation(result);

        this.fireLocationRepo.triggerPushFireLocation(resultCompose);

        return resultCompose;
    };

    getListFireLocation = async (payload: List_Payload): Promise<ListResult<FireLocationResult>> => {
        const result = await this.fireLocationRepo.listFireLocation(payload);

        const items = compose(result.rows, composeFireLocation);

        return {
            items,
            count: result.count,
        };
    };
}

export function composeFireLocation(row: FireLocationJoinAttributes): FireLocationResult {
    return composeResult<FireLocationJoinAttributes, FireLocationResult>(row, {
        pos: row.Po ? composePos(row.Po) : null,
        lat: row.latitude,
        lng: row.longitude,
        status: getStatus(row.status),
        arriveAt: row.arriveAt ? toUnixEpoch(row.arriveAt) : null,
    });
}
