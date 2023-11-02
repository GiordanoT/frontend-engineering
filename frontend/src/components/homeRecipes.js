'use strict';
import {Recipes} from '../api/recipes.js';
import {Views} from '../views/views.js';

(async function() {
    const url = new URL(location.href);
    const category = url.searchParams.get('category');
    const search = url.searchParams.get('search');
    let recipes = [];
    if(category !== null) recipes = await Recipes.getByCategory(category);
    else if(search !== null) recipes = await Recipes.getByName(search);
    else recipes = await Recipes.getAll();
    const father = document.querySelector('#recipes');
    for(let recipe of recipes) {
        const card = await Views.recipeCardHome(recipe);
        father.insertAdjacentHTML('beforeend', card);
        // Add to Favorite.
        const icon = document.querySelector(`#favorite-icon-${recipe._id}`);
        icon.onclick = (e) => alert(recipe._id);
    }
})();
