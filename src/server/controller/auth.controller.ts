import { Request } from "express";
import { AppServiceMap, AuthService } from "../../contract/service.contract";
import { BaseController } from "./base.controller";
import { WrapAppHandler } from "../../handler/default.handler";
import { validate } from "../validate";
import { Login_Payload, Register_Payload } from "../dto/auth.dto";
import { AuthValidator } from "../validate/auth.validator";
import { defaultMiddleware, refreshToken } from "../../utils/middleware-helper.utils";
import { Privilege } from "../../constant/privilege.constant";
import { getForceRefreshToken } from "../../utils/helper.utils";

export class AuthController extends BaseController {
    private service!: AuthService;

    constructor() {
        super("auth");
    }

    init(service: AppServiceMap): void {
        this.service = service.auth;
    }

    initRoute(): void {
        this.router.post("/register", defaultMiddleware(Privilege.Admin), WrapAppHandler(this.postRegister));

        this.router.post("/login", WrapAppHandler(this.postLogin));

        this.router.get("/", refreshToken(), WrapAppHandler(this.getAccessToken));
    }

    postRegister = async (req: Request): Promise<unknown> => {
        const payload = req.body as Register_Payload;

        validate(AuthValidator.Register_Payload, payload);

        const result = await this.service.register(payload);

        return result;
    };

    postLogin = async (req: Request): Promise<unknown> => {
        const payload = req.body as Login_Payload;

        const result = await this.service.login(payload);

        return result;
    };

    getAccessToken = async (req: Request): Promise<unknown> => {
        const xid = getForceRefreshToken(req);

        const result = await this.service.refreshToken(xid);

        return result;
    };
}
