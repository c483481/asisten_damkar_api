import { isValid } from "ulidx";
import { safeValidate } from "../validate";
import { MapsValidator } from "../validate/maps.validator";
import { BaseSocket } from "./base.socket";
import { MapsUpdattePayload } from "../dto/maps.dto";

export class MapsSocket extends BaseSocket {
    constructor() {
        super("maps");
    }
    initSocket(): void {
        this.io.on("connection", (socket) => {
            socket.on("join", (fireLoccationXid: string) => {
                if (typeof fireLoccationXid !== "string") {
                    return;
                }
                socket.join(fireLoccationXid);
                socket.emit("connected", `success connected to ${fireLoccationXid}`);
                console.log(`success connected to ${fireLoccationXid}`);
            });

            socket.on("updateLocation", (payload: MapsUpdattePayload) => {
                const isValidScema = safeValidate(MapsValidator.MapsUpdatePayload, payload);
                if (!isValidScema || !isValid(payload.fireLocationXid)) {
                    return;
                }

                socket.to(payload.fireLocationXid).emit("changeLocation", { lat: payload.lat, lng: payload.lng });
            });
        });
    }
}
