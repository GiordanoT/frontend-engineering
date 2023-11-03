'use strict';

export class U {
    static backendUrl() {
        return 'http://localhost:5002/backend';
    }
    static goHome() {
        let url = window.location.href.split('/');
        delete url[url.length - 1];
        url = url.join('/') + 'index.html';
        window.location.replace(url);
    }
    static isAuthenticated() {
        const user = localStorage.getItem('user');
        return !!user;
    }
}
