export const statusConstant = {
    onGoing: 1,
    late: 2,
    clear: 3,
};

export function getStatus(sts: number) {
    switch (sts) {
        case 1:
            return "On Going";
        case 2:
            return "Late";
        case 3:
            return "Clear";
        default:
            return "Unkown Status";
    }
}
