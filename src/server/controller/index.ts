import { Router } from "express";
import { AppServiceMap } from "../../contract/service.contract";
import { BaseController } from "./base.controller";
import { limiter } from "../../handler/limitter.handler";
import { AuthController } from "./auth.controller";
import { PosController } from "./pos.controller";
import { TruckController } from "./truck.controller";
import { FireLocationController } from "./fire-location.controller";
import { PemadamController } from "./pemadam.controller";
import { ItemsController } from "./items.controller";

export class Controller {
    private readonly auth = new AuthController();
    private readonly pos = new PosController();
    private readonly truck = new TruckController();
    private readonly fireLocation = new FireLocationController();
    private readonly pemadam = new PemadamController();
    private readonly items = new ItemsController();

    init(service: AppServiceMap): Router {
        const router = Router();
        Object.entries(this).forEach(([k, r]) => {
            if (r instanceof BaseController) {
                r.init(service);
                r.initRoute();
                const prefix = `/${r.getPrefix()}`;

                if (r.getUseLimiter()) {
                    router.use(prefix, limiter);
                    console.log(`initiate limiter in ${prefix}`);
                }

                router.use(prefix, r.getRouter());

                console.log(`initiate ${k} route`);
            }
        });

        return router;
    }
}
