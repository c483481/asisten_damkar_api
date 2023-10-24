const role = {
    central: ["CEN", "central"],
    pemadam: ["PEM", "pemadam"],
    admin: ["ADM", "admin"],
};

export function getTagRole(str: string): string | false {
    switch (str) {
        case role.central[1]:
            return role.central[0];
        case role.pemadam[1]:
            return role.pemadam[0];
        case role.admin[1]:
            return role.admin[0];
        default:
            return false;
    }
}

export function getRole(str: string): string | false {
    switch (str) {
        case role.central[0]:
            return role.central[1];
        case role.pemadam[0]:
            return role.pemadam[1];
        case role.admin[0]:
            return role.admin[1];
        default:
            return false;
    }
}
