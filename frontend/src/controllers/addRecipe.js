'use strict';
import {Categories} from '../api/categories.js';
import {Recipes} from '../api/recipes.js';
import {U} from '../common/u.js';

(async function() {
    await categoriesHandler();
    await ingredientsHandler();
    await addRecipeHandler();
})();

async function categoriesHandler() {
    const categories = await Categories.getAll();
    const select = document.querySelector('#recipe-category');
    for(let category of categories) {
        const option = document.createElement('option');
        option.innerText = category.name;
        option.value = category._id;
        select.appendChild(option);
    }
}

async function ingredientsHandler() {
    const ingredients = document.querySelector('#recipe-ingredients')
    const addButton = document.querySelector('#add-ingredient');
    addButton.onclick = (e) => {
        const timestamp = Date.now();
        const input = `<div id='container-ingredient-${timestamp}'>
            <input id='recipe-ingredient-${timestamp}' class='recipe-ingredients' type='text' placeholder='Ingredient' required/>
            <button id='remove-ingredient-${timestamp}'>Remove</button>
        </div>`;
        ingredients.insertAdjacentHTML('beforeend', input);
        const removeButton = document.querySelector(`#remove-ingredient-${timestamp}`);
        removeButton.onclick = (e) => {
            const containerRecipeIngredient = document.querySelector(`#container-ingredient-${timestamp}`);
            containerRecipeIngredient.remove();
        }
    }
}

async function addRecipeHandler() {
    const form = document.querySelector('#add-recipe');
    form.onsubmit = async(e) => {
        e.preventDefault();
        const name = document.querySelector('#recipe-name').value;
        const category = document.querySelector('#recipe-category').value;
        const duration = document.querySelector('#recipe-duration').value;
        const description = document.querySelector('#recipe-description').value;
        const image = document.querySelector('#recipe-image').value;
        const _ingredients = document.getElementsByClassName('recipe-ingredients');
        const ingredients = [];
        for(let ingredient of _ingredients) ingredients.push(ingredient.value);
        const recipe = await Recipes.create(name, category, duration, description, image, ingredients);
        if(recipe._id) U.goToRecipe(recipe);
        else U.goTo400();
    }
}
