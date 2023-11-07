'use strict';
import {U} from '../common/u.js';
import {Links} from '../common/links.js';
import {UserApi} from '../api/users.js';

export class NavbarComponent {
    static async controller() {
        const view = await this.view();
        const navbar = document.querySelector('#navbar');
        navbar.insertAdjacentHTML('beforeend', view);
        const logoutScript = document.createElement('script');
        logoutScript.type = 'module';
        logoutScript.src = '../components/logoutButton.js'
        document.head.appendChild(logoutScript);
        // Setting favorites size number on heart icon.
        if(!U.isAuthenticated()) return;
        const favoritesLength = await UserApi.getFavoritesLength();
        const favoritesM = document.querySelector('#favorites-length-mobile');
        const favoritesD = document.querySelector('#favorites-length-desktop');
        if(favoritesM) favoritesM.innerText = favoritesLength;
        if(favoritesD) favoritesD.innerText = favoritesLength;
    }

    static async view() {
        const isAuthenticated = U.isAuthenticated();
        return `<section>
            <!-- Mobile -->
            <section>
                <div class='hamburger__menu__overlay'></div>
                <div class='hamburger__menu__wrapper'>
                    <div class='hamburger__menu__logo'>
                        <a href='${Links.home.url}'>
                            <img src='${Links.logo.url}' alt='${Links.logo.name}'>
                        </a>
                    </div>
                    <div class='hamburger__menu__cart'>
                        ${(!isAuthenticated) ? `<section>
                            <div class='header__top__right__auth'>
                                <a href='${Links.login.url}'><i class='fa fa-user'></i>${Links.login.name}</a>
                            </div>                        
                            <div class='header__top__right__auth ml-2'>
                                <a href='${Links.register.url}'><i class='fa fa-user'></i>${Links.register.name}</a>
                            </div>` : `<section class='d-flex'>
                            <ul>
                                <li>
                                    <a href='${Links.favoriteRecipes.url}'>
                                        <i class='fa fa-heart'></i>
                                        <span id='favorites-length-mobile'></span>
                                    </a>
                                </li>
                            </ul>
                            <div class='header__top__right__auth ml-auto'>
                                <a id='logout-mobile' href='${Links.logout.url}'><i class='fa fa-user'></i>${Links.logout.name}</a>
                            </div>
                        </section>`}
                    </div>
                    <nav class='hamburger__menu__nav mobile-menu'>
                        <ul>
                            <li><a href='${Links.home.url}'>${Links.home.name.toUpperCase()}</a></li>
                            ${(isAuthenticated) ? `<span>
                                <li><a href='${Links.addRecipe.url}'>${Links.addRecipe.name.toUpperCase()}</a></li>
                                <li><a href='${Links.myRecipes.url}'>${Links.myRecipes.name.toUpperCase()}</a></li>
                            </span>` : `<section></section>`}
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
                                        <a href='${Links.login.url}'><i class='fa fa-user'></i>${Links.login.name}</a>
                                    </div>    
                                    <div class='header__top__right__auth ml-2'>
                                        <a href='${Links.register.url}'><i class='fa fa-user'></i>${Links.register.name}</a>
                                    </div> 
                                </section>` : `<div class='header__top__right__auth'>
                                    <a id='logout-desktop' href='${Links.logout.url}'><i class='fa fa-user'></i>${Links.logout.name}</a>
                                </div>`}                             
                            </div>
                        </div>
                    </div>
                </div>
                <div class='container'>
                    <div class='row'>
                        <div class='col-lg-3'>
                            <div class='header__logo'>
                                <a href='${Links.home.url}'><img src='${Links.logo.url}' alt='${Links.logo.name}'></a>
                            </div>
                        </div>
                        <div class='col-lg-6'>
                            <nav class='header__menu'>
                                <ul>          
                                    <li><a href='${Links.home.url}'>${Links.home.name.toUpperCase()}</a></li>
                                    ${(isAuthenticated) ? `<span>
                                        <li><a href='${Links.addRecipe.url}'>${Links.addRecipe.name.toUpperCase()}</a></li>
                                        <li><a href='${Links.myRecipes.url}'>${Links.myRecipes.name.toUpperCase()}</a></li>
                                    </span>` : `<section></section>`}
                                </ul>
                            </nav>
                        </div>
                        <div class='col-lg-3'>
                            ${(isAuthenticated) ? `<div class='header__cart'>
                                <ul>
                                    <li>
                                        <a href='${Links.favoriteRecipes.url}'>
                                            <i class='fa fa-heart'></i>
                                            <span id='favorites-length-desktop'></span>
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
}

(async function() {await NavbarComponent.controller()}());
