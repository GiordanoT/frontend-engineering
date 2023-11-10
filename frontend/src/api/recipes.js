'use strict';
import {Fetch} from './fetch.js';

/* Recipes endpoints handler */
export class RecipeApi {
    static async create(name, category, duration, description, image, ingredients) {
        const body = JSON.stringify({name, category, duration, description, image, ingredients});
        const response = await Fetch.post('recipes', body);
        if(response.ok) return await response.json();
        return await response.text();
    }

    static async update(recipe, name, category, duration, description, image, ingredients) {
        const body = JSON.stringify({name, category, duration, description, image, ingredients});
        const response = await Fetch.patch(`recipes/${recipe._id}`, body);
        return await response.text();
    }

    static async getAll() {
        const response = await Fetch.get('recipes');
        if(response.ok) return await response.json();
        return [];
    }

    static async getById(id) {
        const response = await Fetch.get(`recipes/${id}`);
        if(response.ok) return await response.json();
        return null;
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

    static async delete(recipe) {
        const response = await Fetch.delete(`recipes/${recipe._id}`);
        return await response.text();
    }
}
