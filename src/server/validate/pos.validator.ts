import { baseValidator, userSessionScema } from "./base.validator";

export class PosValidator {
    static PosCreation_Payload = baseValidator.compile({
        name: { type: "string", min: 3, max: 255, require: true, empty: false },
        lat: { type: "number", min: -90, max: 90, require: true },
        lng: { type: "number", min: -180, max: 180, require: true },
        userSession: userSessionScema,
        $$strict: true,
    });
}
