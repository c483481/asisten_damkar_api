import { NextFunction, Request, RequestHandler, Response } from "express";
import { compareString } from "./compare.utils";
import { saveRefreshToken, saveUsersSession } from "./helper.utils";
import { jwtModule } from "../module/jwt.module";
import { EncodeToken, UserSession } from "../module/dto.module";
import { ERROR_FORBIDDEN, ERROR_UNAUTHORIZE } from "../handler/responses.handler";

export function getValidToken(token: unknown): string | null {
    if (typeof token !== "string") {
        return null;
    }

    const [type, validToken] = token.split(" ");

    if (!compareString(type, "Bearer") || !validToken) {
        return null;
    }

    return validToken;
}

export function defaultMiddleware(audiance?: string[]): RequestHandler {
    return (req: Request, _res: Response, next: NextFunction): void | Response => {
        const accessToken = req.headers.authorization;

        if (!accessToken) {
            next(ERROR_UNAUTHORIZE);
            return;
        }

        const token = getValidToken(accessToken);
        if (!token) {
            next(ERROR_UNAUTHORIZE);
            return;
        }

        try {
            let verification!: EncodeToken;
            if (audiance) {
                verification = jwtModule.verifyWithAudience(token, audiance);
            } else {
                verification = jwtModule.verify(token);
            }
            delete req.headers.authorization;

            const userSession = verification.data as UserSession;

            saveUsersSession(req, userSession);
            next();
        } catch (error) {
            next(ERROR_FORBIDDEN);
        }
    };
}

export function refreshToken(): RequestHandler {
    return (req: Request, _res: Response, next: NextFunction): void | Response => {
        const accessToken = req.headers.authorization;

        if (!accessToken) {
            next(ERROR_UNAUTHORIZE);
            return;
        }

        const token = getValidToken(accessToken);
        if (!token) {
            next(ERROR_UNAUTHORIZE);
            return;
        }

        try {
            const verification = jwtModule.verify(token);

            delete req.headers.authorization;

            const userSession = verification.data as { xid: string };

            saveRefreshToken(req, userSession.xid);
            next();
        } catch (error) {
            next(ERROR_FORBIDDEN);
        }
    };
}
