'use strict';
import {U} from '../common/u.js';
import {RecipeApi} from '../api/recipes.js';
import {CategoryApi} from '../api/categories.js';

export class EditRecipeFormComponent {
    static async controller() {
        await this.categoriesHandler();
        await this.ingredientsHandler();
        // Extracting query parameters.
        const url = new URL(location.href);
        const id = url.searchParams.get('id'); if(!id) U.goTo404();
        const recipe = await RecipeApi.getById(id); if(!recipe) U.goTo404();
        const name = document.querySelector('#recipe-name');
        const category = document.querySelector('#recipe-category');
        const duration = document.querySelector('#recipe-duration');
        const description = document.querySelector('#recipe-description');
        const image = document.querySelector('#recipe-image');
        const ingredients = document.querySelector('#recipe-ingredients');
        name.value = recipe.name;
        category.value = recipe.category;
        duration.value = recipe.duration;
        description.value = recipe.description;
        image.value = recipe.image;
        for(let ingredient of recipe.ingredients) {
            const timestamp = Date.now();
            const input = `<div class='d-flex p-1' id='container-ingredient-${timestamp}'>
                <input class='recipe-ingredients' value='${ingredient}' id='recipe-ingredient-${timestamp}' class='recipe-ingredients' type='text' placeholder='Ingredient' required/>
                <button class='ml-auto site-btn bg-danger' type='button' id='remove-ingredient-${timestamp}'>Remove</button>
            </div>`;
            ingredients.insertAdjacentHTML('beforeend', input);
            const removeButton = document.querySelector(`#remove-ingredient-${timestamp}`);
            removeButton.onclick = (e) => {
                const containerRecipeIngredient = document.querySelector(`#container-ingredient-${timestamp}`);
                containerRecipeIngredient.remove();
            }
        }
        await this.editRecipeHandler(recipe);
    }

    static async view() {}

    /* Private Functions */

    static async categoriesHandler() {
        const categories = await CategoryApi.getAll();
        const select = document.querySelector('#recipe-category');
        for (let category of categories) {
            const option = document.createElement('option');
            option.innerText = category.name;
            option.value = category._id;
            select.appendChild(option);
        }
    }

    static async ingredientsHandler() {
        const ingredients = document.querySelector('#recipe-ingredients');
        const addButton = document.querySelector('#add-ingredient');
        addButton.onclick = (e) => {
            const timestamp = Date.now();
            const input = `<div id='container-ingredient-${timestamp}'>
                <input id='recipe-ingredient-${timestamp}' class='recipe-ingredients' type='text' placeholder='Ingredient' required/>
                <button type='button' id='remove-ingredient-${timestamp}'>Remove</button>
            </div>`;
            ingredients.insertAdjacentHTML('beforeend', input);
            const removeButton = document.querySelector(`#remove-ingredient-${timestamp}`);
            removeButton.onclick = (e) => {
                const containerRecipeIngredient = document.querySelector(`#container-ingredient-${timestamp}`);
                containerRecipeIngredient.remove();
            }
        }
    }

    static async editRecipeHandler(recipe) {
        const form = document.querySelector('#edit-recipe');
        form.onsubmit = async (e) => {
            e.preventDefault();
            const name = document.querySelector('#recipe-name').value;
            const category = document.querySelector('#recipe-category').value;
            const duration = document.querySelector('#recipe-duration').value;
            const description = document.querySelector('#recipe-description').value;
            const image = document.querySelector('#recipe-image').value;
            const _ingredients = document.getElementsByClassName('recipe-ingredients');
            const ingredients = [];
            for (let ingredient of _ingredients) ingredients.push(ingredient.value);
            await RecipeApi.update(recipe, name, category, duration, description, image, ingredients);
            U.goToRecipe(recipe);
        }
    }
}

(async function() {await EditRecipeFormComponent.controller();}());
