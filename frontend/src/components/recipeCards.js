'use strict';
import {U} from '../common/u.js';
import {Links} from '../common/links.js';
import {UserApi} from '../api/users.js';
import {RecipeApi} from '../api/recipes.js';
import {PagerComponent} from './pager.js';

export class RecipeCardsComponent {
    static async controller() {
        // Extracting the page's name from the url (ex. index, addRecipe, ...).
        let path = location.href.split('/'); path = path[path.length - 1].split('.')[0];
        // Extracting query parameters.
        const url = new URL(location.href);
        const category = url.searchParams.get('category');
        const search = url.searchParams.get('search');
        // Building recipes.
        let recipes = [];
        switch(path) {
            case 'index':
                if(category !== null) recipes = await RecipeApi.getByCategory(category);
                else if(search !== null) recipes = await RecipeApi.getByName(search);
                else recipes = await RecipeApi.getAll();
                break;
            case 'myRecipes':
                recipes = await UserApi.getMyRecipes(); break;
            case 'favoriteRecipes':
                recipes = await UserApi.getFavoriteRecipes(); break;
            default: break;
        }
        window.localStorage.setItem('recipes', String(recipes.length));
        const page = parseInt(window.localStorage.getItem('page')) || 0;
        recipes = recipes.slice(page * U.cardsForPage, (page + 1) * U.cardsForPage);
        const father = document.querySelector('#recipes');
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

    static async buildIcons(path, recipe, timestamp) {
        if(!U.isAuthenticated()) return;
        const containerId = `#icons-${timestamp}`;
        const container = document.querySelector(containerId);
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
