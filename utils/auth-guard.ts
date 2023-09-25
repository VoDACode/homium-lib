import { NextFunction, Response, Request } from "express";
import { IConfigService, IDatabaseService } from "../services";
import serviceManager from "../services/ServiceManager";
import { BotModel, SessionModel, UserModel } from "../models";
import { ClientPermissions } from "../models/permission.model";


const clearOldSessionsInterval = setInterval(async () => {
    await clearOldSessions();
}, 1000 * 60 * 60 * 24);

export async function clearOldSessions() {
    const db = serviceManager.get(IDatabaseService);
    await db.sessions.deleteMany({ expiresAt: { $lt: new Date() } });
}

(async () => {
    await clearOldSessions();
})();

export async function signin(req: Request, res: Response, next: NextFunction) {
    const { username, password } = req.body
    if (!username) {
        res.status(401).end();
        return;
    }

    const db = serviceManager.get(IDatabaseService);
    const user = await db.users.findOne({ username: username });
    const expectedPassword = user?.password;
    if (!expectedPassword || expectedPassword !== password) {
        res.status(401).end();
        return
    }

    if (user.enabled === false) {
        res.status(401).send("User is disabled").end();
        return;
    }

    const sessionToken = generateSessionToken();;
    const now = new Date();
    now.setDate(now.getDate() + 3);
    const expiresAt = now;
    const session = new SessionModel(username, expiresAt, sessionToken);

    if (await db.sessions.findOne({ sessionToken: sessionToken })) {
        await db.sessions.updateOne({ sessionToken: sessionToken }, { $set: session }, { upsert: true });
    } else {
        await db.sessions.insertOne(session);
    }
    res.cookie("token", sessionToken, { expires: expiresAt });
    res.status(200).end();
}

export async function authGuard(req: Request, res: Response, next: NextFunction) {
    const db = serviceManager.get(IDatabaseService);
    const configService = serviceManager.get(IConfigService);
    if (configService.config.DEBUG.debug && configService.config.DEBUG.allowAnonymous) {
        next();
        return;
    }
    let apikey = req.headers['x-api-key'];
    if (!apikey && !req.cookies) {
        res.status(401).end();
        return;
    }
    if (apikey) {
        db.bots.findOne({ apiKey: apikey }).then(bot => {
            if (bot == null) {
                res.status(401).send("Bot not found!").end();
                return;
            }

            if (bot.isActivated === false) {
                res.status(401).send("Bot is disabled").end();
                return;
            }
            next();
        });
    } else if (req.cookies) {
        const sessionToken = req.cookies['token'];
        if (!sessionToken) {
            res.status(401).send("Session token not found").end();
            return;
        }

        const userSession = (await db.sessions.findOne({ sessionToken: sessionToken }));
        if (!userSession) {
            res.status(401).send("Session not found").end();
            return;
        }

        if (userSession.expiresAt < new Date()) {
            await db.sessions.deleteOne({ sessionToken: sessionToken });
            res.status(401).send("Session expired").end();
            return;
        }
        next();
    }
}

export async function signout(req: Request, res: Response, next: NextFunction) {
    if (!req.cookies || req.cookies['token'] === undefined) {
        res.status(401).end()
        return
    }
    const db = serviceManager.get(IDatabaseService);
    await db.sessions.deleteOne({ sessionToken: req.cookies['token'] });
    res.clearCookie("token");
    res.status(200).end();
}

export async function refresh(req: Request, res: Response) {
    if (!req.cookies) {
        res.status(401).end()
        return
    }

    const sessionToken = req.cookies['token']
    if (!sessionToken) {
        res.status(401).end()
        return
    }

    const db = serviceManager.get(IDatabaseService);
    const userSession = (await db.sessions.findOne({ sessionToken: sessionToken }));
    if (!userSession) {
        res.status(401).end()
        return
    }
    if (userSession.expiresAt < new Date()) {
        await db.sessions.deleteOne({ sessionToken: sessionToken });
        res.status(401).end()
        return
    }
    const newSessionToken = generateSessionToken();

    const now = new Date();
    now.setDate(now.getDate() + 3);
    const expiresAt = now;

    await db.sessions.updateOne({ sessionToken: sessionToken }, {
        $set: {
            sessionToken: newSessionToken,
            expiresAt: expiresAt
        }
    }, { upsert: true });

    res.cookie("token", newSessionToken, { expires: expiresAt })
    res.status(200).end()
}

export async function getUser(data: Request | string): Promise<UserModel | null> {
    const db = serviceManager.get(IDatabaseService);
    const userSession = (await db.sessions.findOne({ sessionToken: getToken() }));
    if (!userSession) {
        return null;
    }
    if (userSession.expiresAt < new Date()) {
        await db.sessions.deleteOne({ sessionToken: getToken() });
        return null;
    }
    return await db.users.findOne({ username: userSession.username });

    function getToken() {
        return typeof data === 'string' ? data : data.cookies['token'];
    }
}

export async function getBot(req: Request, options = {
    checkActivated: true
}): Promise<BotModel | null> {
    return await new Promise<BotModel | null>(resolve => {
        const apikey = req.headers['x-api-key'];
        if (!apikey) {
            resolve(null);
            return;
        }

        const db = serviceManager.get(IDatabaseService);
        db.bots.findOne({ apiKey: apikey }).then(bot => {
            if (!bot) {
                resolve(null);
                return;
            }

            if (bot.isActivated === false && options.checkActivated) {
                resolve(null);
                return;
            }
            resolve(bot);
        });
    });
}

export async function isAuthorized(req: Request): Promise<boolean> {
    return await getUser(req) !== null || await getBot(req) !== null;
}

export async function getPermissions(req: Request): Promise<ClientPermissions | null> {
    const bot = await getBot(req);
    if (bot !== null) {
        return bot.permissions;
    }

    const user = await getUser(req);
    if (user === null) {
        return null;
    }
    return user.permissions;
}

export async function hasPermission(req: Request, perm: (p: ClientPermissions) => any): Promise<boolean> {
    const bot = await getBot(req);
    if (bot !== null) {
        return perm(bot.permissions);
    }
    const user = await getUser(req);
    if (user === null) {
        return false;
    }
    return perm(user.permissions);
}

function generateSessionToken() {
    let token = '';
    for (let i = 0; i < 254; i++) {
        token += String.fromCharCode(Math.floor(Math.random() * 62) + 48);
    }
    return Buffer.from(token).toString('base64');
}