'use strict';
import {Views} from '../views/views.js';

(async function() {
    const navbar = document.querySelector('#navbar');
    navbar.insertAdjacentHTML('beforeend', await Views.navbar());
}())
