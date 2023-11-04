'use strict';
import {AuthApi} from '../api/auth.js';
import {U} from '../common/u.js';

(async function() {
    const logoutD = document.querySelector('#logout-desktop');
    const logoutM = document.querySelector('#logout-mobile');
    const logout = async(e) => {
        const response = await AuthApi.logout();
        if(!response.error) {
            localStorage.setItem('user', '');
            U.goToHome();
        }
    };
    if(logoutD) logoutD.onclick = logout;
    if(logoutM) logoutM.onclick = logout;
})();
