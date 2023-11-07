'use strict';
import {U} from '../common/u.js';

export class SearchRecipeComponent {
    static async controller() {
        const form = document.getElementById('search-recipe');
        form.onsubmit = (e) => {
            e.preventDefault();
            const url = new URL(location.href);
            const page = url.searchParams.get('page');
            const category = url.searchParams.get('category');
            const search = document.getElementById('search-recipe-value').value;
            const query = U.buildQuery(page, category, search);
            U.goTo('index', query);
        }
    }

    static async view() {}
}

(async function() {await SearchRecipeComponent.controller();}());
