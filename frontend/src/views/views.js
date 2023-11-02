'use strict';
import {U} from '../common/u.js';
import {Users} from '../api/users.js';

export class Views {
    static logo = {name: 'Logo', url: '../../static/img/logo.png'};
    static home = {name: 'Home', url: './index.html'};
    static recipe = {name: 'Recipe', url: './recipe.html'};
    static addRecipe = {name: 'Add Recipe', url: './addRecipe.html'};
    static myRecipes = {name: 'My Recipes', url: './myRecipes.html'};
    static favoriteRecipes = {name: 'Favorite Recipes', size: 99, url: './favoriteRecipes.html'};
    static login = {name: 'Login', url: './login.html'};
    static register = {name: 'Register', url: './register.html'};
    static logout = {name: 'Logout', url: './logout.html'};
    static navLinks = [this.home, this.addRecipe, this.myRecipes];
    static authLinks = [this.login, this.register, this.logout];

    static async navbar() {
        const isAuthenticated = U.isAuthenticated();
        const navLinks = (isAuthenticated) ? this.navLinks : [this.home];
        return `<section>
            <!-- Mobile -->
            <section>
                <div class='hamburger__menu__overlay'></div>
                <div class='hamburger__menu__wrapper'>
                    <div class='hamburger__menu__logo'>
                        <a href='${this.home.url}'><img src='${this.logo.url}' alt='${this.logo.name}'></a>
                    </div>
                    <div class='hamburger__menu__cart'>
                        ${(!isAuthenticated) ? `<section>
                            <div class='header__top__right__auth'>
                                <a href='${this.login.url}'><i class='fa fa-user'></i>${this.login.name}</a>
                            </div>                        
                            <div class='header__top__right__auth ml-2'>
                                <a href='${this.register.url}'><i class='fa fa-user'></i>${this.register.name}</a>
                            </div>` : `<section class='d-flex'>
                            <ul>
                                <li>
                                    <a href='${this.favoriteRecipes.url}'>
                                        <i class='fa fa-heart'></i>
                                        <span>${this.favoriteRecipes.size}</span>
                                    </a>
                                </li>
                            </ul>
                            <div class='header__top__right__auth ml-auto'>
                                <a href='${this.logout.url}'><i class='fa fa-user'></i>${this.logout.name}</a>
                            </div>
                        </section>`}
                    </div>
                    <nav class='hamburger__menu__nav mobile-menu'>
                        <ul>
                            ${navLinks.map(navLink => `<li>
                                <a href='${navLink.url}'>${navLink.name}</a>
                            </li>`)}
                        </ul>
                    </nav>
                    <div id='mobile-menu-wrap'></div>
                </div>
            </section>  
            
            <!-- Desktop -->
            <header class='header'>
                <div class='header__top'>
                    <div class='container'>
                        <div class='row'>
                            <div class='header__top__right ml-auto'>
                                ${(!isAuthenticated) ? `<section>
                                    <div class='header__top__right__auth'>
                                        <a href='${this.login.url}'><i class='fa fa-user'></i>${this.login.name}</a>
                                    </div>    
                                    <div class='header__top__right__auth ml-2'>
                                        <a href='${this.register.url}'><i class='fa fa-user'></i>${this.register.name}</a>
                                    </div> 
                                </section>` : `<div class='header__top__right__auth'>
                                    <a href='${this.logout.url}'><i class='fa fa-user'></i>${this.logout.name}</a>
                                </div>`}                             
                            </div>
                        </div>
                    </div>
                </div>
                <div class='container'>
                    <div class='row'>
                        <div class='col-lg-3'>
                            <div class='header__logo'>
                                <a href='${this.home.url}'><img src='${this.logo.url}' alt='${this.logo.name}'></a>
                            </div>
                        </div>
                        <div class='col-lg-6'>
                            <nav class='header__menu'>
                                <ul>
                                    ${navLinks.map(navLink => `<li>
                                        <a href='${navLink.url}'>${navLink.name}</a>
                                    </li>`)}
                                </ul>
                            </nav>
                        </div>
                        <div class='col-lg-3'>
                            ${(isAuthenticated) ? `<div class='header__cart'>
                                <ul>
                                    <li>
                                        <a href='${this.favoriteRecipes.url}'>
                                            <i class='fa fa-heart'></i>
                                            <span>${this.favoriteRecipes.size}</span>
                                        </a>
                                    </li>
                                </ul>
                            </div>` : `<section></section>`}
                        </div>
                    </div>
                    <div class='hamburger__open'>
                        <i class='fa fa-bars'></i>
                    </div>
                </div>
            </header>
        </section>`;
    }
    static async recipeCardHome(recipe) {
        const iconId = `favorite-icon-${recipe._id}`;
        const author = await Users.getById(recipe.author);
        return `<div class='col-lg-3 col-md-4 col-sm-6 mix'>
            <div class='featured__item'>
                <div class='featured__item__pic set-bg' style='background-image: url(${recipe.image});'>
                    <ul class='featured__item__pic__hover'>
                        <li><a href='${this.recipe.url}?recipe=${recipe._id}'><i class='fa fa-info'></i></a></li>
                        <li><a id='${iconId}' href='${this.home.url}'><i class='fa fa-heart'></i></a></li>
                    </ul>
                </div>
                <div class='featured__item__text'>
                    <h5 style='text-overflow: ellipsis;overflow: hidden;'>${recipe.name}</h5>
                    <h6 style='text-overflow: ellipsis;overflow: hidden;'>${author.username}</h6>
                </div>
            </div>
        </div>`;
    }
    static async recipeCardFavorite(recipe) {
        const iconId = `remove-favorite-icon-${recipe._id}`;
        return `<div class='col-lg-3 col-md-4 col-sm-6 mix'>
            <div class='featured__item'>
                <div class='featured__item__pic set-bg' data-setbg='${recipe.image}'>
                    <ul class='featured__item__pic__hover'>
                        <li><a href='${this.recipe.url}?recipe=${recipe._id}'><i class='fa fa-info'></i></a></li>
                        <li><a id='${iconId}' href='${this.favoriteRecipes.url}'><i class='fa fa-remove'></i></a></li>
                    </ul>
                </div>
                <div class='featured__item__text'>
                    <h5>${recipe.author}</h5>
                    <h6>${recipe.name}</h6>
                </div>
            </div>
        </div>`;
    }
    static async recipeCardPublished(recipe) {
        const editIconId = `edit-recipe-icon-${recipe._id}`;
        const deleteIconId = `delete-recipe-icon-${recipe._id}`;
        return `<div class='col-lg-3 col-md-4 col-sm-6 mix'>
            <div class='featured__item'>
                <div class='featured__item__pic set-bg' data-setbg='${recipe.image}'>
                    <ul class='featured__item__pic__hover'>
                        <li><a href='${this.recipe.url}?recipe=${recipe._id}'><i class='fa fa-info'></i></a></li>
                        <li><a id='${editIconId}' href='${this.myRecipes.url}'><i class='fa fa-edit'></i></a></li>
                        <li><a id='${deleteIconId}' href='${this.myRecipes.url}'><i class='fa fa-trash'></i></a></li>
                    </ul>
                </div>
                <div class='featured__item__text'>
                    <h5>${recipe.author}</h5>
                    <h6>${recipe.name}</h6>
                </div>
            </div>
        </div>`;
    }

}
