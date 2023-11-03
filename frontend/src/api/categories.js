'use strict';
import {Fetch} from './fetch.js';

export class Categories {

    static async getAll() {
        const response = await Fetch.get('categories');
        if(response.ok) return await response.json();
        return [];
    }
}
