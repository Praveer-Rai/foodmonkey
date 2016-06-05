/**
 * Created by flori on 05.06.2016.
 */
'use strict';

angular.module('myApp.recipes')

    .directive('mvRecipeCard', function() {
        return {
            restrict: 'A',
            scope: {
                recipe: '='
            },
            templateUrl: 'components/recipe-card/recipe-card.html'
        };
    });
