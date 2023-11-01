import { Request } from "express";
import { AppServiceMap, PosService } from "../../contract/service.contract";
import { BaseController } from "./base.controller";
import { PosCreation_Payload, PosResult } from "../dto/pos.dto";
import { validate } from "../validate";
import { PosValidator } from "../validate/pos.validator";
import { defaultMiddleware } from "../../utils/middleware-helper.utils";
import { Privilege } from "../../constant/privilege.constant";
import { WrapAppHandler } from "../../handler/default.handler";

export class PosController extends BaseController {
    private service!: PosService;

    constructor() {
        super("pos");
    }

    init(service: AppServiceMap): void {
        this.service = service.pos;
    }

    initRoute(): void {
        this.router.post("/", defaultMiddleware(Privilege.Central), WrapAppHandler(this.postCreatePos));
    }

    postCreatePos = async (req: Request): Promise<PosResult> => {
        const payload = req.body as PosCreation_Payload;

        validate(PosValidator.PosCreation_Payload, payload);

        const result = await this.service.createPos(payload);

        return result;
    };
}
