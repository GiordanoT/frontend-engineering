'use strict';
import {CategoryApi} from '../api/categories.js';
import {U} from '../common/u.js';

export class CategoriesComponent {
    static async controller() {
        /* Retrieving categories and building menu */
        const categories = await CategoryApi.getAll();
        const father = document.getElementById('categories');
        for(let category of categories) {
            const view = await this.view(category);
            father.insertAdjacentHTML('beforeend', view);
        }
    }

    static async view(category) {
        /* Setting the category query parameter in order to filter recipes */
        const url = new URL(location.href);
        const page = url.searchParams.get('page');
        const search = url.searchParams.get('search');
        const query = U.buildQuery(page, category._id, search);
        return `<li>
            <a href='${query}'>${category.name}</a>
        </li>`
    }
}

(async function() {await CategoriesComponent.controller();})();
