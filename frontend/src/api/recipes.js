'use strict';
export class Recipes {
    static recipes = [
        {id: '1', name: 'Hamburger 1', author: 'Mario Rossi', image: '../../static/img/product.jpg', category: '1'},
        {id: '2', name: 'Hamburger 2', author: 'Mario Rossi', image: '../../static/img/product.jpg', category: '0'},
        {id: '3', name: 'Hamburger 3', author: 'Mario Rossi', image: '../../static/img/product.jpg', category: '1'}
    ];
    static async getAll() {
        return this.recipes;
    }
    static async getByCategory(category) {
        return this.recipes.filter(recipe => recipe.category === category);
    }
    static async getByName(name) {
        return this.recipes.filter(recipe => recipe.name.toLowerCase().includes(name.toLowerCase()));
    }
}
