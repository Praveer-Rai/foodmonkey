/**
 * Created by Florian Noack on 27.06.2016.
 */

'use strict';

angular.module('myApp.recipes')

    .factory('Ingredient', function($resource) {
        return $resource('http://localhost:3000/api/ingredients/:ingredient_id', {ingredient_id: '@_id'});
    });
