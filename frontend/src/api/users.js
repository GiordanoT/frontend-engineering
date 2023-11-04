'use strict';
import {Fetch} from './fetch.js';
import {RecipeApi} from './recipes.js';

export class UserApi {

    static async getById(id) {
        const response = await Fetch.get(`users/${id}`);
        if(response.ok) return await response.json();
        return null;
    }

    static async getMyRecipes() {
        const response = await Fetch.get(`recipes/mine`);
        if(response.ok) return await response.json();
        return [];
    }

    static async getFavoriteRecipes() {
        const response = await Fetch.get(`favorites`);
        if(!response.ok) return [];
        const favorites = await response.json();
        const recipes = []
        for(let favorite of favorites) {
            const recipe = await RecipeApi.getById(favorite.recipe);
            if(recipe) recipes.push(recipe);
        }
        return recipes;
    }

    static async getFavoritesLength() {
        const response = await Fetch.get(`favorites`);
        if(!response.ok) return 0;
        const favorites = await response.json();
        return favorites.length;
    }

    static async addToFavoriteRecipes(recipe) {
        const response = await Fetch.get(`favorites/${recipe._id}`);
        return await response.text();
    }

    static async removeFromFavoriteRecipes(recipe) {
        const response = await Fetch.delete(`favorites/${recipe._id}`);
        return await response.text();
    }
}
