'use strict';
import {CategoryApi} from '../api/categories.js';

export class CategoriesComponent {
    static async controller() {
        const categories = await CategoryApi.getAll();
        const father = document.querySelector('#categories');
        for(let category of categories) {
            const view = await this.view(category);
            father.insertAdjacentHTML('beforeend', view);
        }
    }

    static async view(category) {
        return `<li>
            <a href='?category=${category._id}'>${category.name}</a>
        </li>`
    }
}

(async function() {await CategoriesComponent.controller();})();
