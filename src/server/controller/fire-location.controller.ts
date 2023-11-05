import { Request } from "express";
import { AppServiceMap, FireLocationService } from "../../contract/service.contract";
import { BaseController } from "./base.controller";
import { FireLocationCreation_Payload, FireLocationResult } from "../dto/fire-location.dto";
import { getForceUsersSession, getListOption } from "../../utils/helper.utils";
import { defaultMiddleware } from "../../utils/middleware-helper.utils";
import { Privilege } from "../../constant/privilege.constant";
import { WrapAppHandler } from "../../handler/default.handler";
import { validate } from "../validate";
import { FireLocationValidator } from "../validate/fire-location.validator";
import { ListResult } from "../../module/dto.module";

export class FireLocationController extends BaseController {
    private service!: FireLocationService;
    constructor() {
        super("fire-location");
    }

    init(service: AppServiceMap): void {
        this.service = service.fireLocation;
    }

    initRoute(): void {
        this.router.post("/", defaultMiddleware(Privilege.Central), WrapAppHandler(this.postCreateFireLocation));

        this.router.get("/", defaultMiddleware(), WrapAppHandler(this.getListFireLocation));
    }

    postCreateFireLocation = async (req: Request): Promise<FireLocationResult> => {
        const payload = req.body as FireLocationCreation_Payload;

        const userSession = getForceUsersSession(req);

        payload.userSession = userSession;

        validate(FireLocationValidator.FireLocationCreation_Payload, payload);

        const result = await this.service.createFireLocation(payload);

        return result;
    };

    getListFireLocation = async (req: Request): Promise<ListResult<FireLocationResult>> => {
        const payload = getListOption(req);

        const result = await this.service.getListFireLocation(payload);

        return result;
    };
}
