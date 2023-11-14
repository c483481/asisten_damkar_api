import { baseValidator } from "./base.validator";

export class MapsValidator {
    static MapsUpdatePayload = baseValidator.compile({
        fireLocationXid: { type: "string", length: 26, require: true },
        lat: { type: "number", min: -90, max: 90, require: true },
        lng: { type: "number", min: -180, max: 180, require: true },
        $$strict: true,
    });
}
