'use strict';
import {AuthApi} from '../api/auth.js';
import {U} from '../common/u.js';

export class RegisterForm {
    static async controller() {
        const form = document.querySelector('#register');
        form.onsubmit = async(e) => {
            e.preventDefault();
            const username = document.querySelector('#register-username').value;
            const email = document.querySelector('#register-email').value;
            const password = document.querySelector('#register-password').value;
            const response = await AuthApi.register(username, email, password);
            if(response.error) {
                const error = document.querySelector('#register-error');
                error.innerText = response.error;
            } else {
                delete response.error;
                localStorage.setItem('user', JSON.stringify(response));
                U.goToHome();
            }
        }
    }

    static async view() {}
}

(async function() {await RegisterForm.controller()}());
