'use strict';
import {Fetch} from './fetch.js';

/* Categories endpoints handler */
export class CategoryApi {

    static async getAll() {
        const response = await Fetch.get('categories');
        if(response.ok) return await response.json();
        return [];
    }

    static async getById(id) {
        const response = await Fetch.get(`categories/${id}`);
        if(response.ok) return await response.json();
        return null;
    }
}
