import { Request } from "express";
import { Privilege } from "../../constant/privilege.constant";
import { AppServiceMap, ItemsService } from "../../contract/service.contract";
import { defaultMiddleware } from "../../utils/middleware-helper.utils";
import { BaseController } from "./base.controller";
import { getDetailOption } from "../../utils/helper.utils";

export class ItemsController extends BaseController {
    private service!: ItemsService;
    constructor() {
        super("items");
    }

    init(service: AppServiceMap): void {
        this.service = service.items;
    }

    initRoute(): void {
        this.router.patch("/:xid", defaultMiddleware(Privilege.Pemadam));
    }

    putUpdateStatus = async (req: Request): Promise<unknown> => {
        const payload = getDetailOption(req);

        const result = await this.service.updateStatusItem(payload);

        return result;
    };
}
