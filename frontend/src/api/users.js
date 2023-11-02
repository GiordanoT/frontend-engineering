'use strict';
import {U} from '../common/u.js';

export class Users {
    static default = {_id: 'unknown', username: 'unknown', email: 'unknown'};

    static async getById(id) {
        try {
            const method = 'GET';
            const recipes = await fetch(`${U.backendUrl()}/users/${id}`, {method});
            return await recipes.json();
        } catch (e) {return this.default;}
    }
}
