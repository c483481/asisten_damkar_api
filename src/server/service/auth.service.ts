import { isValid } from "ulidx";
import { getTagRole } from "../../constant/role.constant";
import { AppRepositoryMap, UsersRepository } from "../../contract/repository.contract";
import { AuthService } from "../../contract/service.contract";
import { bcryptModule } from "../../module/bcrypt.module";
import { jwtModule } from "../../module/jwt.module";
import { errorResponses } from "../../response";
import { createData } from "../../utils/helper.utils";
import { LoginResult, Login_Payload, RefreshTokenResult, Register_Payload } from "../dto/auth.dto";
import { UsersResult } from "../dto/users.dto";
import { UsersCreationAttributes } from "../model/users.model";
import { BaseService } from "./base.service";
import { composeUsers } from "./users.service";

export class Auth extends BaseService implements AuthService {
    private usersRepo!: UsersRepository;

    init(repository: AppRepositoryMap): void {
        this.usersRepo = repository.users;
    }

    register = async (payload: Register_Payload): Promise<UsersResult> => {
        const { username, password, role } = payload;

        const validRole = getTagRole(role);

        if (!validRole) {
            throw errorResponses.getError("E_REQ_1");
        }

        const newPassword = await bcryptModule.hash(password);

        const createdValues = createData<UsersCreationAttributes>({
            username,
            password: newPassword,
            role: validRole,
        });

        const result = await this.usersRepo.insertUsers(createdValues);

        return composeUsers(result);
    };

    login = async (payload: Login_Payload): Promise<LoginResult> => {
        const { username, password } = payload;

        const users = await this.usersRepo.findByUsername(username);

        if (!users) {
            throw errorResponses.getError("E_AUTH_2");
        }

        if (!(await bcryptModule.compare(password, users.password))) {
            throw errorResponses.getError("E_AUTH_2");
        }

        const result = composeUsers(users) as LoginResult;

        result.key = {
            accessToken: jwtModule.issueWithAudience(
                {
                    username: result.username,
                    xid: result.xid,
                },
                users.role
            ),
            refreshToken: jwtModule.issueEdit({ xid: users.xid }, 3600 * 24),
        };

        return result;
    };

    refreshToken = async (xid: string): Promise<RefreshTokenResult> => {
        if (!isValid(xid)) {
            throw errorResponses.getError("E_AUTH_1");
        }

        const users = await this.usersRepo.findByXid(xid);

        if (!users) {
            throw errorResponses.getError("E_AUTH_1");
        }

        const result = composeUsers(users) as RefreshTokenResult;

        result.key = {
            accessToken: jwtModule.issueWithAudience(result, users.role),
        };

        return result;
    };
}
