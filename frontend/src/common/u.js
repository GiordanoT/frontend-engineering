'use strict';

/* Utility class (contains some useful functions) */
export class U {
    static getCurrentPage() {
        let path = location.href.split('/');
        return path[path.length - 1].split('.')[0];
    }

    static goTo(path, queryParams) {
        let url = window.location.href.split('/');
        delete url[url.length - 1];
        url = `${url.join('/')}${path}.html`;
        if(queryParams) {
            queryParams = (queryParams.startsWith('?') ? queryParams : '?' + queryParams);
            url = url + queryParams;
        }
        window.location.replace(url);
    }

    static goToHome() {this.goTo('index');}
    static goTo400() {this.goTo('400');}
    static goTo404() {this.goTo('404');}
    static goToRecipe(recipe) {this.goTo('recipe', `id=${recipe._id}`);}
    static goToEditRecipe(recipe) {this.goTo('editRecipe', `id=${recipe._id}`);}

    static refresh() {location.reload();}

    static isAuthenticated() {
        const user = localStorage.getItem('user');
        return !!user;
    }

    static buildQuery(page, category, search) {
        let query = '?';
        if(page) query = `${query}page=${page}&`;
        if(category) query = `${query}category=${category}&`;
        if(search) query = `${query}search=${search}&`;
        return query;
    }

    /* Number of recipes shown in pages */
    static cardsForPage = 4 * 3;
}
