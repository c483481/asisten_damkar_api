import { baseValidator, xidScema } from "./base.validator";

export class PemadamValidator {
    static PemadamCreation_Payload = baseValidator.compile({
        userXid: xidScema,
        posXid: xidScema,
        truckXid: xidScema,
        $$strict: true,
    });
}
