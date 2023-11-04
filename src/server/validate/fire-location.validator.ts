import { baseValidator, userSessionScema } from "./base.validator";

export class FireLocationValidator {
    static FireLocationCreation_Payload = baseValidator.compile({
        posXid: { type: "string", length: 26, require: true },
        lat: { type: "number", min: -90, max: 90, require: true },
        lng: { type: "number", min: -180, max: 180, require: true },
        userSession: userSessionScema,
    });
}
