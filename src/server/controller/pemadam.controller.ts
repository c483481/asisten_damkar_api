import { Request } from "express";
import { AppServiceMap, PemadamService } from "../../contract/service.contract";
import { BaseController } from "./base.controller";
import { PemadamCreation_Payload } from "../dto/pemadam.dto";
import { validate } from "../validate";
import { PemadamValidator } from "../validate/pemadam.validator";
import { defaultMiddleware } from "../../utils/middleware-helper.utils";
import { Privilege } from "../../constant/privilege.constant";
import { WrapAppHandler } from "../../handler/default.handler";
import { getDetailOption } from "../../utils/helper.utils";

export class PemadamController extends BaseController {
    private service!: PemadamService;

    constructor() {
        super("pemadam");
    }

    init(service: AppServiceMap): void {
        this.service = service.pemadam;
    }

    initRoute(): void {
        this.router.post("/", defaultMiddleware(Privilege.Admin), WrapAppHandler(this.postCreatePemadam));

        this.router.get("/:xid", defaultMiddleware(), WrapAppHandler(this.getInfoPemadam));
    }

    postCreatePemadam = async (req: Request): Promise<unknown> => {
        const payload = req.body as PemadamCreation_Payload;

        validate(PemadamValidator.PemadamCreation_Payload, payload);

        const result = await this.service.createPemadam(payload);

        return result;
    };

    getInfoPemadam = async (req: Request): Promise<unknown> => {
        const payload = getDetailOption(req);

        const result = await this.service.getPemadamInfo(payload.xid);

        return result;
    };
}
