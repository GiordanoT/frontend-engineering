'use strict';
import {Recipes} from '../api/recipes.js';

(async function() {
    const url = new URL(location.href);
    const category = url.searchParams.get('category');
    const search = url.searchParams.get('search');
    const recipes = (category !== null) ? await Recipes.getByCategory(category) : (search !== null) ? await Recipes.getByName(search) : await Recipes.getAll();
    for(let recipe of recipes) {
        const iconId = `favorite-icon-${recipe.id}`;
        const child = `<div class='col-lg-3 col-md-4 col-sm-6 mix'>
            <div class='featured__item'>
                <div class='featured__item__pic set-bg' data-setbg='${recipe.image}'>
                    <ul class='featured__item__pic__hover'>
                        <li><a id='${iconId}' href='./index.html'><i class='fa fa-heart'></i></a></li>
                        <li><a href='./pages/recipe.html?recipe=${recipe.id}'><i class='fa fa-info'></i></a></li>
                    </ul>
                </div>
                <div class='featured__item__text'>
                    <h5>${recipe.author}</h5>
                    <h6>${recipe.name}</h6>
                </div>
            </div>
        </div>`;
        const father = document.querySelector('#recipes');
        father.insertAdjacentHTML('beforeend', child);
        const icon = document.querySelector(`#${iconId}`);
        icon.onclick = (e) => alert(recipe.id);
    }
})();
