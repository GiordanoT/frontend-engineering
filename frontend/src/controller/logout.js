'use strict';
import {Auth} from '../api/auth.js';

(async function() {
    const form = document.querySelector('#login');
    form.onsubmit = async(e) => {
        e.preventDefault();
        const email = document.querySelector('#login-email').value;
        const password = document.querySelector('#login-password').value;
        const response = await Auth.login(email, password);
        if(response.error) {
            const error = document.querySelector('#login-error');
            error.innerText = 'Bad Credentials.';
        } else {
            delete response.authentication.password; delete response.error;
            localStorage.setItem('user', JSON.stringify(response));
            let url = window.location.href.split('/');
            delete url[url.length - 1];
            url = url.join('/') + 'index.html';
            window.location.replace(url);
        }
    }
})();
