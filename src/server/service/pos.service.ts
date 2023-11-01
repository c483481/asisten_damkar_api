import { AppRepositoryMap, PosRepository } from "../../contract/repository.contract";
import { PosService } from "../../contract/service.contract";
import { composeResult, createData } from "../../utils/helper.utils";
import { PosCreation_Payload, PosResult } from "../dto/pos.dto";
import { PosAttributes, PosCreationAttributes } from "../model/pos.model";
import { BaseService } from "./base.service";

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
                location: {
                    type: "Point",
                    coordinates: [lat, lng],
                },
                active: true,
            },
            userSession
        );

        const result = await this.posRepo.insertPos(createdValues);

        return composePos(result);
    };
}

export function composePos(row: PosAttributes): PosResult {
    return composeResult<PosAttributes, PosResult>(row, {
        name: row.name,
        location: {
            lat: row.location.coordinates[0],
            lng: row.location.coordinates[1],
        },
        active: row.active,
    });
}
