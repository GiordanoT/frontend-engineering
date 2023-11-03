'use strict';
import {U} from '../common/u.js';

export class Auth {

    static async login(email, password) {
        try {
            const method = 'POST';
            const credentials = 'include';
            const headers = {'Content-type': 'application/json; charset=UTF-8'};
            const body = JSON.stringify({email, password});
            const response = await fetch(`${U.backendUrl()}/auth/login`, {method, credentials, headers, body});
            const login = await response.json();
            if(response.status === 200) return {...login, error: false};
            else return {error: true};
        } catch (e) {return {error: true} }
    }

    static async logout() {
        try {
            const method = 'GET';
            const credentials = 'include';
            const response = await fetch(`${U.backendUrl()}/auth/logout`, {method, credentials});
            console.log(response)
            if(response.status === 200) return {error: false};
            else return {error: true};
        } catch (e) {return {error: true} }
    }
}
