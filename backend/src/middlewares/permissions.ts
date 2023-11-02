import {Request, Response, NextFunction} from 'express';
import {Users} from '../db';
import U from '../common/u';

class PermissionsMiddleware {
    static isOwner = async(req: Request, res: Response, next: NextFunction): Promise<Response|void> => {
        try {
            const user = await Users.getByToken(U.getToken(req));
            console.log(user);
            next();
        } catch(error) {
            return res.status(400).send(error);
        }
    }
}

export default PermissionsMiddleware;
