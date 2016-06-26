/**
 * Created by Florian Noack on 26.06.2016.
 */

angular.module('myApp.create')
    .controller('CreateRecipeCtrl', function($scope, Recipe, $mdDialog, $rootScope, currUser) {

        $scope.recipe = new Recipe();
        $scope.difficulties = ('easy medium hard').split(' ').map(function(diff){
            return {abbrev:diff}
        });
        $scope.ingrediens = [{name: 'Cola', price: 1.20, quantity: 4}, {name: 'Beer', price: 1.80, quantity: 4}];
        $scope.steps = ["1. Step"];
        /*
        var ingr = new Ingredient();
        ingr.name = "Test";
        ingr.price = 1.20;
        ingr.quantity = 4;
        */
        $scope.addNewIngredient = function() {
            $scope.ingrediens.push({});

        };

        $scope.removeIngredient = function() {
            var lastItem = $scope.ingrediens.length-1;
            $scope.ingrediens.splice(lastItem);
        };

        $scope.addNewStep = function() {
            $scope.steps.push("");

        };

        $scope.removeStep = function() {
            var lastItem = $scope.steps.length-1;
            $scope.steps.splice(lastItem);
        };

        $scope.save = function() {
            $scope.recipe.user = currUser.getUser()._id;
            $scope.recipe.$save()
                .then(function(){
                    $rootScope.$broadcast('recipeCreated', $scope.recipe);
                    $mdDialog.hide(true);
                }).catch(function(){
                $mdDialog.hide(false);
            });
        };

        $scope.cancel = function() {
            console.log("cancel")
        };

    });
