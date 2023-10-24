import { baseValidator } from "./base.validator";

export class AuthValidator {
    static Register_Payload = baseValidator.compile({
        username: "string|empty:false|required|min:5|max:255",
        password: "string|empty:false|required|min:5|max:255",
        role: {
            type: "enum",
            values: ["admin", "pemadam", "central"],
        },
        $$strict: true,
    });

    static Login_Payload = baseValidator.compile({
        username: "string|empty:false|required|min:5|max:255",
        password: "string|empty:false|required|min:5|max:255",
        $$strict: true,
    });
}
