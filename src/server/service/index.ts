import { AppRepositoryMap } from "../../contract/repository.contract";
import { AppServiceMap, AuthService, PosService, TruckService } from "../../contract/service.contract";
import { BaseService } from "./base.service";
import { Auth } from "./auth.service";
import { Pos } from "./pos.service";
import { Truck } from "./truck.service";

export class Service implements AppServiceMap {
    readonly auth: AuthService = new Auth();
    readonly pos: PosService = new Pos();
    readonly truck: TruckService = new Truck();

    init(repository: AppRepositoryMap) {
        Object.entries(this).forEach(([k, r]) => {
            if (r instanceof BaseService) {
                r.init(repository);
                console.log(`initiate service ${k}`);
            }
        });
    }
}
