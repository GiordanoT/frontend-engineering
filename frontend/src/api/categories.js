'use strict';
import {U} from '../common/u.js';

export class Categories {
    static default = {_id: 'unknown', name: 'unknown'}

    static async getAll() {
        try {
            const categories = await fetch(`${U.backendUrl()}/categories`, {method: 'GET'});
            return await categories.json();
        } catch(e) {return [];}

    }
}
