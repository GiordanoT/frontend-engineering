'use strict';
import {AuthApi} from '../api/auth.js';
import {U} from '../common/u.js';

export class LoginForm {
    static async controller() {
        const form = document.querySelector('#login');
        form.onsubmit = async(e) => {
            e.preventDefault();
            const email = document.querySelector('#login-email').value;
            const password = document.querySelector('#login-password').value;
            const response = await AuthApi.login(email, password);
            if(response.error) {
                const error = document.querySelector('#login-error');
                error.innerText = response.error;
            } else {
                delete response.authentication.password; delete response.error;
                localStorage.setItem('user', JSON.stringify(response));
                U.goToHome();
            }
        }
    }

    static async view() {}
}

(async function() {await LoginForm.controller()}());
