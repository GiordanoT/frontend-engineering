'use strict';
import {AuthApi} from '../api/auth.js';
import {U} from '../common/u.js';

export class LogoutButton {
    static async controller() {
        const logoutD = document.getElementById('logout-desktop');
        const logoutM = document.getElementById('logout-mobile');
        const logout = async(e) => {
            await AuthApi.logout();
            localStorage.setItem('user', '');
            U.goToHome();
        };
        if(logoutD) logoutD.onclick = logout;
        if(logoutM) logoutM.onclick = logout;
    }

    static async view() {}
}

(async function() {await LogoutButton.controller()}());
