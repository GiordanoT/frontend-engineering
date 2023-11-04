'use strict';

export class U {
    static goTo(path, queryParams) {
        let url = window.location.href.split('/');
        delete url[url.length - 1];
        url = `${url.join('/')}${path}.html`;
        url = (queryParams) ? `${url}?${queryParams}` : url;
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

    static cardsForPage = 4 * 3;
}
