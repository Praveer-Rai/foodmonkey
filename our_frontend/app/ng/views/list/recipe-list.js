'use strict';

angular.module('myApp.recipes')

    .constant('recipeListState', {
        name: 'recipes.list',
        options: {

            // Using an empty url means that this child state will become active
            // when its parent's url is navigated to. Urls of child states are
            // automatically appended to the urls of their parent. So this state's
            // url is '/recipes' (because '/recipes' + '').
            url: '',

            // IMPORTANT: Now we have a state that is not a top level state. Its
            // template will be inserted into the ui-view within this state's
            // parent's template; so the ui-view within contacts.html. This is the
            // most important thing to remember about templates.
            views: {
                'content@root': {
                    templateUrl: 'views/list/recipe-list.html',
                    controller: 'RecipeListCtrl',
                }
            }

        }

    })

    .controller('RecipeListCtrl', function($rootScope, $scope, Recipe) {
        $scope.recipes = Recipe.query();
        $scope.filterArray = function(recipe) {
            if(typeof($rootScope.selectedRecipeTypes) !== 'undefined') {
                if($rootScope.selectedRecipeTypes.length === 0) return true;
                return ($rootScope.selectedRecipeTypes.indexOf(recipe.recipeType) !== -1);
            } else
                return true;
        };
    });

