import Validator from "fastest-validator";

export const baseValidator = new Validator();

export const userSessionScema = {
    type: "object",
    props: {
        xid: {
            type: "string",
            length: 26,
        },
        username: {
            type: "string",
            min: 0,
            max: 255,
        },
    },
    strict: true,
};
