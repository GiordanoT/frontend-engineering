'use strict';
import {U} from '../common/u.js';

export class PagerComponent {
    static async controller() {
        const url = new URL(location.href);
        let page = parseInt(url.searchParams.get('page')) || 0; page = (page < 0) ? 0 : page;
        const recipes = parseInt(window.localStorage.getItem('recipes')) || 0;
        const previous = document.getElementById('previous-page');
        const next = document.getElementById('next-page');
        if(page <= 0) previous.className = 'd-none';
        const neededPages = parseFloat(String(recipes / U.cardsForPage));
        if((page + 1) >= neededPages) next.className = 'd-none';

        const category = url.searchParams.get('category');
        const search = url.searchParams.get('search');

        previous.onclick = (e) => {
            const query = U.buildQuery(page - 1, category, search);
            U.goTo(U.getCurrentPage(), query);
        }
        next.onclick = (e) => {
            const query = U.buildQuery(page + 1, category, search);
            U.goTo(U.getCurrentPage(), query);
        }
    }

    static async view() {}
}
