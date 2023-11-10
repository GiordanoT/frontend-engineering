'use strict';
import {Fetch} from './fetch.js';

/* Authentication endpoints handler */
export class AuthApi {

    static async register(username, email, password) {
        const body = JSON.stringify({username, email, password});
        const response = await Fetch.post('auth/register', body);
        if(response.ok) return {...(await response.json()), error: ''};
        else return {error: await response.text()};
    }

    static async login(email, password) {
        const body = JSON.stringify({email, password});
        const response = await Fetch.post('auth/login', body);
        if(response.ok) return {...(await response.json()), error: ''};
        else return {error: await response.text()};
    }

    static async logout() {
        const response = await Fetch.get('auth/logout');
        if(response.ok) return {error: ''};
        else return {error: await response.text()};
    }
}
