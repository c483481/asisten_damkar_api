import { Request } from "express";
import { AppServiceMap, FireLocationService } from "../../contract/service.contract";
import { BaseController } from "./base.controller";
import { FireLocationResult } from "../dto/fire-location.dto";
import { getDetailOption } from "../../utils/helper.utils";
import { defaultMiddleware } from "../../utils/middleware-helper.utils";
import { Privilege } from "../../constant/privilege.constant";
import { WrapAppHandler } from "../../handler/default.handler";

export class FireLocationController extends BaseController {
    private service!: FireLocationService;
    constructor() {
        super("fire-location");
    }

    init(service: AppServiceMap): void {
        this.service = service.fireLocation;
    }

    initRoute(): void {
        this.router.post("/:xid", defaultMiddleware(Privilege.Central), WrapAppHandler(this.postCreateFireLocation));
    }

    postCreateFireLocation = async (req: Request): Promise<FireLocationResult> => {
        const payload = getDetailOption(req);

        const result = await this.service.createFireLocation(payload.xid);

        return result;
    };
}
