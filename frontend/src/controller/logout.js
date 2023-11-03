'use strict';
import {Auth} from '../api/auth.js';
import {U} from '../common/u.js';

(async function() {
    const logoutD = document.querySelector('#logout-desktop');
    const logoutM = document.querySelector('#logout-mobile');
    const logout = async(e) => {
        const response = await Auth.logout();
        if(!response.error) {
            localStorage.setItem('user', '');
            U.goHome();
        }
    };
    logoutD.onclick = logout; logoutM.onclick = logout;
})();
