'use strict';
import {U} from '../common/u.js'

/* Fetch wrapper */
export class Fetch {
    static url = 'http://localhost:5002/backend/';
    static credentials = 'include';
    static headers = {'Content-type': 'application/json; charset=UTF-8'};

    static async get(path) {
        try {
            const response = await fetch(this.url + path, {method: 'GET', credentials: this.credentials});
            console.log(`GET: ${path}`, response);
            return response;
        } catch(e) {U.goTo400()}
    }

    static async post(path, body) {
        try {
            const response = await fetch(this.url + path, {
                method: 'POST',
                credentials: this.credentials,
                headers: this.headers,
                body
            });
            console.log(`POST: ${path}`, body, response);
            return response;
        } catch(e) {U.goTo400()}
    }

    static async patch(path, body) {
        try {
            const response = await fetch(this.url + path, {
                method: 'PATCH',
                credentials: this.credentials,
                headers: this.headers,
                body
            });
            console.log(`PATCH: ${path}`, body, response);
            return response;
        } catch(e) {U.goTo400()}
    }

    static async delete(path) {
        try {
            const response = await fetch(this.url + path, {method: 'DELETE', credentials: this.credentials});
            console.log(`DELETE: ${path}`, response);
            return response;
        } catch(e) {U.goTo400()}
    }
}
