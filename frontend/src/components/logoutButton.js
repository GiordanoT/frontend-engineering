'use strict';
import {AuthApi} from '../api/auth.js';
import {U} from '../common/u.js';

export class LogoutButton {
    static async controller() {
        const logoutD = document.querySelector('#logout-desktop');
        const logoutM = document.querySelector('#logout-mobile');
        const logout = async(e) => {
            await AuthApi.logout();
            localStorage.setItem('user', '');
            U.goToHome();
        };
        if(logoutD) logoutD.onclick = logout;
        if(logoutM) logoutM.onclick = logout;
        window.localStorage.setItem('page', '0');
    }

    static async view() {}
}

(async function() {await LogoutButton.controller()}());
