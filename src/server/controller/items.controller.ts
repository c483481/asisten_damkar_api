import { Request } from "express";
import { Privilege } from "../../constant/privilege.constant";
import { AppServiceMap, ItemsService } from "../../contract/service.contract";
import { defaultMiddleware } from "../../utils/middleware-helper.utils";
import { BaseController } from "./base.controller";
import { getDetailOption } from "../../utils/helper.utils";
import { WrapAppHandler } from "../../handler/default.handler";

export class ItemsController extends BaseController {
    private service!: ItemsService;
    constructor() {
        super("items");
    }

    init(service: AppServiceMap): void {
        this.service = service.items;
    }

    initRoute(): void {
        this.router.patch("/:xid", defaultMiddleware(Privilege.Pemadam), WrapAppHandler(this.putUpdateStatus));

        this.router.delete("/:xid", defaultMiddleware(Privilege.Pemadam), WrapAppHandler(this.deleteItems));
    }

    putUpdateStatus = async (req: Request): Promise<unknown> => {
        const payload = getDetailOption(req);

        const result = await this.service.updateStatusItem(payload);

        return result;
    };

    deleteItems = async (req: Request): Promise<unknown> => {
        const payload = getDetailOption(req);

        await this.service.deleteItems(payload);

        return "success";
    };
}
