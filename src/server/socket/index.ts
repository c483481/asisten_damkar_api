import { Server as HttpServer } from "http";
import { AppServiceMap } from "../../contract/service.contract";
import { Server } from "socket.io";
import { BaseSocket } from "./base.socket";
import { PemadamSocket } from "./pemadam.socket";
import { MapsSocket } from "./maps.socket";

export class SocketServer {
    private readonly pemadam = new PemadamSocket();
    private readonly maps = new MapsSocket();

    init({ server, service }: { server: HttpServer; service: AppServiceMap }): void {
        const io: Server = new Server(server, {
            cors: {
                origin: ["*"],
            },
        });

        Object.entries(this).map(([k, r]) => {
            if (r instanceof BaseSocket) {
                const path = `/${r.getPrefix()}`;
                const socket = io.of(path);
                r.setSocket(socket);
                r.init(service);
                r.initEvent();
                r.initSocket();
                console.log(`initiate ${k} socket`);
            }
        });
    }
}
