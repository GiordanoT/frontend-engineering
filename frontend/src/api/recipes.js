'use strict';
import {Fetch} from './fetch.js';

export class Recipes {
    static async create(name, category, duration, description, image, ingredients) {
        // todo: add duration on backend
        const body = JSON.stringify({name, category, duration, description, image, ingredients});
        const response = await Fetch.post('recipes', body);
        if(response.ok) return await response.json();
        return await response.text();
    }

    static async getAll() {
        const response = await Fetch.get('recipes');
        if(response.ok) return await response.json();
        return [];
    }

    static async getByCategory(category) {
        const response = await Fetch.get(`categories/${category}/recipes`);
        if(response.ok) return await response.json();
        return [];
    }

    static async getByName(name) {
        const body = JSON.stringify({search: name});
        const response = await Fetch.post(`recipes/search`, body);
        if(response.ok) return await response.json();
        return [];
    }
}
