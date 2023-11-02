import {Request, Response, NextFunction} from 'express';

class IdMiddleware {
    static validate = async(req: Request, res: Response, next: NextFunction): Promise<Response|void> => {
        try {
            const {id} = req.params;
            if (!id.match(/^[0-9a-fA-F]{24}$/)) return res.status(400).send('Invalid ID.');
            return next();
        } catch(error) {
            return res.status(400).send(error);
        }
    }
}

export default IdMiddleware;
