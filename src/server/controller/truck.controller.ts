import { Request } from "express";
import { AppServiceMap, TruckService } from "../../contract/service.contract";
import { BaseController } from "./base.controller";
import { TruckCreation_Payload, TruckResult } from "../dto/truck.dto";
import { getForceUsersSession } from "../../utils/helper.utils";
import { validate } from "../validate";
import { TruckValidator } from "../validate/truck.validator";
import { defaultMiddleware } from "../../utils/middleware-helper.utils";
import { Privilege } from "../../constant/privilege.constant";
import { WrapAppHandler } from "../../handler/default.handler";

export class TruckController extends BaseController {
    private service!: TruckService;

    constructor() {
        super("truck");
    }

    init(service: AppServiceMap): void {
        this.service = service.truck;
    }

    initRoute(): void {
        this.router.post("/", defaultMiddleware(Privilege.Central), WrapAppHandler(this.postCreateTruck));
    }

    postCreateTruck = async (req: Request): Promise<TruckResult> => {
        const payload = req.body as TruckCreation_Payload;

        const userSession = getForceUsersSession(req);

        payload.userSession = userSession;

        validate(TruckValidator.TruckCreation_Payload, payload);

        const result = await this.service.createTruck(payload);

        return result;
    };
}
