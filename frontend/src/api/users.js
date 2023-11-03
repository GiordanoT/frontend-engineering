'use strict';
import {Fetch} from './fetch.js';

export class Users {

    static async getById(id) {
        const response = await Fetch.get(`users/${id}`);
        if(response.ok) return await response.json();
        return null;
    }
}
