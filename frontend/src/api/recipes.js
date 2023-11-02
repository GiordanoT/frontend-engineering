'use strict';
import {U} from '../common/u.js';

export class Recipes {
    static default = {_id: 'unknown', name: 'unknown', author: 'unknown', category: 'unknown',
        ingredients: 'unknown', description: 'unknown', image: 'unknown'};

    static async getAll() {
        try {
            const method = 'GET';
            const recipes = await fetch(`${U.backendUrl()}/recipes`, {method});
            return await recipes.json();
        } catch (e) {return [];}

    }
    static async getByCategory(category) {
        try {
            const method = 'GET';
            const recipes = await fetch(`${U.backendUrl()}/categories/${category}/recipes`, {method});
            return await recipes.json();
        } catch (e) {return this.default;}

    }
    static async getByName(name) {
        try {
            const method = 'POST';
            const headers = {'Content-type': 'application/json; charset=UTF-8'};
            const body = JSON.stringify({search: name});
            const recipes = await fetch(`${U.backendUrl()}/recipes/search`, {method, headers, body});
            return await recipes.json();
        } catch (e) {return [];}
    }
}
