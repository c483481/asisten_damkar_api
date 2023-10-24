import { getTagRole } from "../../constant/role.constant";
import { AppRepositoryMap, UsersRepository } from "../../contract/repository.contract";
import { AuthService } from "../../contract/service.contract";
import { bcryptModule } from "../../module/bcrypt.module";
import { errorResponses } from "../../response";
import { createData } from "../../utils/helper.utils";
import { Register_Payload } from "../dto/auth.dto";
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
}
