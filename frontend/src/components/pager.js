'use strict';
import {U} from '../common/u.js';

export class PagerComponent {
    static async controller() {
        const page = parseInt(window.localStorage.getItem('page')) || 0;
        const recipes = parseInt(window.localStorage.getItem('recipes')) || 0;
        const previous = document.getElementById('previous-page');
        const next = document.getElementById('next-page');
        if(page <= 0) previous.className = 'd-none';
        const neededPages = parseFloat(String(recipes / U.cardsForPage));
        if((page + 1) >= neededPages) next.className = 'd-none';
        console.log(parseInt(String(recipes / U.cardsForPage)))
        previous.onclick = (e) => {
            window.localStorage.setItem('page', String(page - 1 ));
            U.refresh();
        }
        next.onclick = (e) => {
            window.localStorage.setItem('page', String(page + 1 ));
            U.refresh();
        }
    }

    static async view() {}
}
