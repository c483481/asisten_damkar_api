import { Request } from "express";
import { AppServiceMap, AuthService } from "../../contract/service.contract";
import { BaseController } from "./base.controller";
import { WrapAppHandler } from "../../handler/default.handler";
import { validate } from "../validate";
import { Register_Payload } from "../dto/auth.dto";
import { AuthValidator } from "../validate/auth.validator";

export class AuthController extends BaseController {
    private service!: AuthService;

    constructor() {
        super("auth");
    }

    init(service: AppServiceMap): void {
        this.service = service.auth;
    }

    initRoute(): void {
        this.router.post("/register", WrapAppHandler(this.postRegister));
    }

    postRegister = async (req: Request): Promise<unknown> => {
        const payload = req.body as Register_Payload;

        validate(AuthValidator.Register_Payload, payload);

        const result = await this.service.register(payload);

        return result;
    };
}
