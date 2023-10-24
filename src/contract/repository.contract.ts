import { UsersAttributes, UsersCreationAttributes } from "../server/model/users.model";

export interface AppRepositoryMap {
    users: UsersRepository;
}

export interface UsersRepository {
    insertUsers(payload: UsersCreationAttributes): Promise<UsersAttributes>;
}
