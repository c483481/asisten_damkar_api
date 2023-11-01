import { baseValidator } from "./base.validator";

export class PosValidator {
    static PosCreation_Payload = baseValidator.compile({
        lat: { type: "number", min: -90, max: 90, require: true },
        lng: { type: "number", min: -180, max: 180, require: true },
        $$strict: true,
    });
}
