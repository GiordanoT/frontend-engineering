'use strict';
import {Views} from '../views/views.js';

(async function() {
    const navbar = document.querySelector('#navbar');
    navbar.insertAdjacentHTML('beforeend', await Views.navbar());
    const logoutScript = document.createElement('script');
    logoutScript.type = 'module';
    logoutScript.src = '../controllers/logout.js'
    document.head.appendChild(logoutScript);
}())
