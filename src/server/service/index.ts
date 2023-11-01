import { AppRepositoryMap } from "../../contract/repository.contract";
import { AppServiceMap, AuthService, PosService } from "../../contract/service.contract";
import { BaseService } from "./base.service";
import { Auth } from "./auth.service";
import { Pos } from "./pos.service";

export class Service implements AppServiceMap {
    readonly auth: AuthService = new Auth();
    readonly pos: PosService = new Pos();

    init(repository: AppRepositoryMap) {
        Object.entries(this).forEach(([k, r]) => {
            if (r instanceof BaseService) {
                r.init(repository);
                console.log(`initiate service ${k}`);
            }
        });
    }
}
