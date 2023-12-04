import { AppRepositoryMap } from "../../contract/repository.contract";
import {
    AppServiceMap,
    AuthService,
    FireLocationService,
    ItemsService,
    PemadamService,
    PosService,
    TruckService,
} from "../../contract/service.contract";
import { BaseService } from "./base.service";
import { Auth } from "./auth.service";
import { Pos } from "./pos.service";
import { Truck } from "./truck.service";
import { FireLocation } from "./fire-location.service";
import { Pemadam } from "./pemadam.service";
import { Items } from "./items.service";

export class Service implements AppServiceMap {
    readonly auth: AuthService = new Auth();
    readonly pos: PosService = new Pos();
    readonly truck: TruckService = new Truck();
    readonly fireLocation: FireLocationService = new FireLocation();
    readonly pemadam: PemadamService = new Pemadam();
    readonly items: ItemsService = new Items();

    init(repository: AppRepositoryMap) {
        Object.entries(this).forEach(([k, r]) => {
            if (r instanceof BaseService) {
                r.init(repository);
                console.log(`initiate service ${k}`);
            }
        });
    }
}
