import { getRole } from "../../constant/role.constant";
import { composeResult } from "../../utils/helper.utils";
import { UsersResult } from "../dto/users.dto";
import { UsersAttributes } from "../model/users.model";

export function composeUsers(row: UsersAttributes): UsersResult {
    return composeResult(row, {
        username: row.username,
        tagRole: row.role,
        role: getRole(row.role) || null,
    });
}
