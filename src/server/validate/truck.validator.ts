import { baseValidator, userSessionScema } from "./base.validator";

export class TruckValidator {
    static TruckCreation_Payload = baseValidator.compile({
        posXid: { type: "string", length: 26, require: true, empty: false },
        plat: { type: "string", min: 5, max: 12, require: true, empty: false },
        userSession: userSessionScema,
        $$strict: true,
    });
}
