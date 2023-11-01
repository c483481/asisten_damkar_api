import { PosAttributes, PosCreationAttributes } from "../server/model/pos.model";
import { UsersAttributes, UsersCreationAttributes } from "../server/model/users.model";

export interface AppRepositoryMap {
    users: UsersRepository;
    pos: PosRepository;
}

export interface UsersRepository {
    insertUsers(payload: UsersCreationAttributes): Promise<UsersAttributes>;

    findByUsername(username: string): Promise<UsersAttributes | null>;

    findByXid(xid: string): Promise<UsersAttributes | null>;
}

export interface PosRepository {
    insertPos(payload: PosCreationAttributes): Promise<PosAttributes>;
}
