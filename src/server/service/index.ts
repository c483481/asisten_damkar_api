import { AppRepositoryMap } from "../../contract/repository.contract";
import { AppServiceMap, AuthService } from "../../contract/service.contract";
import { BaseService } from "./base.service";
import { Auth } from "./auth.service";

export class Service implements AppServiceMap {
    readonly auth: AuthService = new Auth();

    init(repository: AppRepositoryMap) {
        Object.entries(this).forEach(([k, r]) => {
            if (r instanceof BaseService) {
                r.init(repository);
                console.log(`initiate service ${k}`);
            }
        });
    }
}
