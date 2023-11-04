'use strict';
import {U} from '../common/u.js';
import {RecipeApi} from '../api/recipes.js';
import {CategoryApi} from '../api/categories.js';

export class RecipeComponent {
    static async controller() {
        // Extracting query parameters.
        const url = new URL(location.href);
        const id = url.searchParams.get('id'); if(!id) U.goTo404();
        const recipe = await RecipeApi.getById(id); if(!recipe) U.goTo404();
        // Querying the DOM.
        const names = document.getElementsByClassName('recipe-name');
        const category = document.querySelector('#recipe-category');
        const duration = document.querySelector('#recipe-duration');
        const description = document.querySelector('#recipe-description');
        const image = document.querySelector('#recipe-image');
        const ingredients = document.querySelector('#recipe-ingredients');
        // Setting data.
        for(let name of names) name.innerText = recipe.name;
        category.innerText = (await CategoryApi.getById(recipe.category))?.name;
        duration.innerText = recipe.duration;
        description.innerText = recipe.description;
        image.innerText = recipe.image;
        ingredients.innerText = JSON.stringify(recipe.ingredients);
    }

    static async view() {}
}

(async function() {await RecipeComponent.controller();})();
