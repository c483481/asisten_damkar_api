import { pubsubEvent } from "../../constant/pubsub.contstant";
import { PubSubAck, pubSub } from "../../module/pubsub.modul";
import { FireLocationResult } from "../dto/fire-location.dto";
import { BaseSocket } from "./base.socket";
import { Socket } from "socket.io";

export class PemadamSocket extends BaseSocket {
    constructor() {
        super("pemadam");
    }

    initEvent() {
        pubSub.subscribe(pubsubEvent.pushFireLocation, this.sendNewFireLocation);
    }

    initSocket(): void {
        this.io.on("connection", (socket: Socket) => {
            socket.on("join", (posXid: string) => {
                if (typeof posXid !== "string") {
                    return;
                }
                socket.join(posXid);
                socket.emit("connected", `success connected to ${posXid}`);
            });
        });
    }

    private sendNewFireLocation = async (payload: FireLocationResult): Promise<PubSubAck> => {
        if (!payload.pos) {
            return PubSubAck.NACK;
        }
        const posXid = payload.pos.xid;
        this.io.to(posXid).emit("fire-location", payload);
        console.log(`send new fire location to ${posXid}`);
        return PubSubAck.ACK;
    };
}
