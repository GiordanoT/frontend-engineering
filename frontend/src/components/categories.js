'use strict';
import {Categories} from '../api/categories.js';

(async function() {
    const categories = await Categories.getAll();
    const father = document.querySelector('#categories');
    for(let category of categories) {
        const child = `<li>
            <a href='?category=${category.id}'>${category.name}</a>
        </li>`;
        father.insertAdjacentHTML('beforeend', child);
    }
})();
