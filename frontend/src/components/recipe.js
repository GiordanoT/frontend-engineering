'use strict';
import {U} from '../common/u.js';
import {RecipeApi} from '../api/recipes.js';
import {CategoryApi} from '../api/categories.js';
import {UserApi} from '../api/users.js';

export class RecipeComponent {
    static async controller() {
        // Extracting query parameters.
        const url = new URL(location.href);
        const id = url.searchParams.get('id'); if(!id) U.goTo404();
        const recipe = await RecipeApi.getById(id); if(!recipe) U.goTo404();
        // Querying the DOM.
        const name = document.getElementById('recipe-name');
        const author = document.getElementById('recipe-author');
        const category = document.getElementById('recipe-category');
        const duration = document.getElementById('recipe-duration');
        const description = document.getElementById('recipe-description');
        const image = document.getElementById('recipe-image');
        const ingredients = document.getElementById('recipe-ingredients');
        // Setting recipe data.
        name.innerText = recipe.name;
        author.innerText = 'Author: ' + (await UserApi.getById(recipe.author))?.username;
        category.innerText = 'Category: ' + (await CategoryApi.getById(recipe.category))?.name;
        duration.innerText = recipe.duration;
        description.innerText = recipe.description;
        image.src = recipe.image;
        for(let ingredient of recipe.ingredients)
            ingredients.insertAdjacentHTML('beforeend', `<div class='ml-2'>• ${ingredient}</div>`);
        await this.favoriteHandler(recipe)
    }

    static async view(recipe, timestamp) {}

    /* PRIVATE FUNCTIONS */
    static async favoriteHandler(recipe) {
        if(!U.isAuthenticated()) return;
        const container = document.getElementById('container-add-to-favorite');
        const favoritesRecipes = await UserApi.getFavoriteRecipes();
        let iconClass = 'fa-heart-o';
        const alreadyInFavorites = favoritesRecipes.map(r => r._id).includes(recipe._id);
        if(alreadyInFavorites) iconClass = 'fa-heart';
        container.insertAdjacentHTML('beforeend', `<a id='add-to-favorite' href='#'>
            <i class='fa fa-2x ${iconClass}'></i>
        </a>`);
        const icon = document.getElementById('add-to-favorite');
        if(alreadyInFavorites)
            icon.onclick = async(e) => {
                const response = await UserApi.removeFromFavoriteRecipes(recipe);
                alert(response); U.refresh();
            };
        else
            icon.onclick = async(e) => {
                const response = await UserApi.addToFavoriteRecipes(recipe);
                alert(response); U.refresh();
            };
    }
}

(async function() {await RecipeComponent.controller();})();
