'use strict';

angular.module('myApp.recipes')

    .factory('Recipe', function($resource) {
        return $resource('http://localhost:3000/api/recipes/:recipe_id', {recipe_id: '@_id'});
    });