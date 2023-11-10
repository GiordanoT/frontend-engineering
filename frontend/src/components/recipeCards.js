'use strict';
import {U} from '../common/u.js';
import {Links} from '../common/links.js';
import {UserApi} from '../api/users.js';
import {RecipeApi} from '../api/recipes.js';
import {PagerComponent} from './pager.js';
import {CategoryApi} from '../api/categories.js';

export class RecipeCardsComponent {
    static async controller() {
        // Extracting the page's name from the url (ex. index, addRecipe, ...).
        let path = U.getCurrentPage();
        // Extracting query parameters.
        const url = new URL(location.href);
        const category = url.searchParams.get('category');
        const search = url.searchParams.get('search');
        let page = parseInt(url.searchParams.get('page')) || 0; page = (page < 0) ? 0 : page;
        // Building recipes depending on the page (index, myRecipes and favoriteRecipes).
        let recipes = [];
        switch(path) {
            case 'index':
                /* Retrieving all the recipes */
                recipes = await RecipeApi.getAll();
                /* If there is a category -> filter by the specified category */
                if(category !== null) {
                    recipes = recipes.filter(recipe => recipe.category === category);
                    const container = document.getElementById('container-filter-category');
                    container.className = 'd-block';
                    const filter = document.getElementById('filter-category');
                    const categoryName = await CategoryApi.getById(category);
                    filter.innerText = categoryName.name;
                    const removeFilter = document.getElementById('remove-category-filter');
                    removeFilter.onclick = (e) => {
                        const url = new URL(location.href);
                        const page = url.searchParams.get('page');
                        const search = url.searchParams.get('search');
                        const query = U.buildQuery(page, undefined, search);
                        U.goTo('index', query);
                    }
                }
                /* If there is a searched name -> filter by the searched name */
                if(search !== null) {
                    recipes = recipes.filter(recipe => recipe.name.toLowerCase().includes(search.toLowerCase()));
                    const container = document.getElementById('container-filter-name');
                    container.className = 'd-block';
                    const filter = document.getElementById('filter-name');
                    filter.innerText = search;
                    const removeFilter = document.getElementById('remove-name-filter');
                    removeFilter.onclick = (e) => {
                        const url = new URL(location.href);
                        const page = url.searchParams.get('page');
                        const category = url.searchParams.get('category');
                        const query = U.buildQuery(page, category, undefined);
                        U.goTo('index', query);
                    }
                }

                break;
            case 'myRecipes':
                /* Retrieving user's recipes */
                recipes = await UserApi.getMyRecipes(); break;
            case 'favoriteRecipes':
                /* Retrieving user's favorite recipes */
                recipes = await UserApi.getFavoriteRecipes(); break;
            default: break;
        }
        // Communicating the number of pages needed for the PagerComponent through the localStorage.
        window.localStorage.setItem('recipes', String(recipes.length));
        /* Filtering recipes by pages */
        recipes = recipes.slice(page * U.cardsForPage, (page + 1) * U.cardsForPage);
        const father = document.getElementById('recipes');
        for(let recipe of recipes) {
            const timestamp = Date.now();
            const card = await this.view(recipe, timestamp);
            father.insertAdjacentHTML('beforeend', card);
            await this.buildIcons(path, recipe, timestamp);
        }
    }

    static async view(recipe, timestamp) {
        const author = await UserApi.getById(recipe.author);
        const iconsContainerId = `icons-${timestamp}`;
        return `<div class='col-lg-3 col-md-4 col-sm-6 mix'>
            <div class='featured__item'>
                <div class='featured__item__pic set-bg' style='background-image: url(${recipe.image});'>
                    <ul id='${iconsContainerId}' class='featured__item__pic__hover'>
                        <li><a href='${Links.recipe.url}?id=${recipe._id}'><i class='fa fa-info'></i></a></li>
                    </ul>
                </div>
                <div class='featured__item__text'>
                    <h5 style='text-overflow: ellipsis;overflow: hidden;'>${recipe.name}</h5>
                    <h6 style='text-overflow: ellipsis;overflow: hidden;'>${author?.username}</h6>
                </div>
            </div>
        </div>`;
    }

    /* PRIVATE FUNCTIONS */

    /* Building the recipe's icons depending on the page (index -> info, heart; myRecipes -> info, edit, trash;
    favoriteRecipes -> info, remove) */
    static async buildIcons(path, recipe, timestamp) {
        if(!U.isAuthenticated()) return;
        const containerId = `icons-${timestamp}`;
        const container = document.getElementById(containerId);
        let icons = [];
        switch (path) {
            case 'index':
                icons.push(await this.buildIcon(recipe, `favorite-icon`, 'heart', async() => {
                    const response = await UserApi.addToFavoriteRecipes(recipe);
                    alert(response); U.refresh();
                })); break;
            case 'myRecipes':
                icons.push(await this.buildIcon(recipe, `edit-icon`, 'edit', async() => {
                    U.goToEditRecipe(recipe);
                }));
                icons.push(await this.buildIcon(recipe, `delete-icon`, 'trash', async() => {
                    const response = await RecipeApi.delete(recipe);
                    alert(response); U.refresh();
                })); break;
            case 'favoriteRecipes':
                icons.push(await this.buildIcon(recipe, `remove-icon`, 'remove', async() => {
                    const response = await UserApi.removeFromFavoriteRecipes(recipe);
                    alert(response); U.refresh();
                })); break;
            default: break;
        }
        for(let icon of icons) container.appendChild(icon);
    }

    static async buildIcon(recipe, iconCategory, iconName, fx) {
        const li = document.createElement('li');
        const a = document.createElement('a');
        a.id = `${iconCategory}-${recipe._id}`; a.href='#';
        a.onclick = (e) => {fx()};
        const i = document.createElement('i'); i.className = `fa fa-${iconName}`;
        a.appendChild(i); li.appendChild(a);
        return li;
    }
}

(async function() {
    await RecipeCardsComponent.controller();
    await PagerComponent.controller();
})();
