import crypto from 'crypto';
import {Request} from 'express';

class U {
    static random(): string {
        return crypto.randomBytes(128).toString('base64');
    }
    static encrypt(password: string): string {
        return crypto.createHmac('sha256', password).update('SECRET_KEY').digest('hex');
    }
    static getToken(req: Request): string {
        return req.cookies['AUTH-TOKEN'] || '';
    }
}

export default U;
