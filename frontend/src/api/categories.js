'use strict';
export class Categories {
    static async getAll() {
        return [
            {id: '0', name: 'Appetizers'},
            {id: '1', name: 'First Dishes'},
            {id: '2', name: 'Second Dishes'},
            {id: '3', name: 'Side Dishes'},
            {id: '4', name: 'Leavened'},
            {id: '5', name: 'Sweets'}
        ];
    }
}
