'use strict';

export class Links {
    static logo = {name: 'Logo', url: '../../static/img/logo.png'};
    static home = {name: 'Home', url: './index.html'};
    static recipe = {name: 'Recipe', url: './recipe.html'};
    static addRecipe = {name: 'Add Recipe', url: './addRecipe.html'};
    static myRecipes = {name: 'My Recipes', url: './myRecipes.html'};
    static favoriteRecipes = {name: 'Favorite Recipes', url: './favoriteRecipes.html'};
    static login = {name: 'Login', url: './login.html'};
    static register = {name: 'Register', url: './register.html'};
    static logout = {name: 'Logout', url: 'javascript:;'};
    static navLinks = [this.home, this.addRecipe, this.myRecipes];
    static authLinks = [this.login, this.register, this.logout];
}
