/**
 * Created by Florian Noack on 26.06.2016.
 */

angular.module('myApp.create')
    .controller('CreateRecipeCtrl', function($scope, Recipe, $mdDialog, $rootScope, currUser, $mdToast) {

        $scope.recipe = new Recipe();
        //$scope.steps = [];
        $scope.recipe.steps = [];

        $scope.difficulties = ('easy medium hard').split(' ').map(function(diff){
            return {abbrev:diff}
        });
        $scope.ingrediens = [{name: 'Cola', price: 1.20, quantity: 4}, {name: 'Beer', price: 1.80, quantity: 4}];

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

        $scope.addNewStep = function(ev) {
            var confirm = $mdDialog.prompt()
                .title('Add new Step to Recipe')
                .textContent('Please describe the step')
                .placeholder('Step')
                .targetEvent(ev)
                .cancel('Cancel')
                .ok('Add Step');
            $mdDialog.show(confirm).then(function(result) {
                showSimpleToast("New Step added to recipe")
                //$scope.steps.push(result);
                $scope.recipe.steps.push(result);
            }, function() {
                showSimpleToast("Adding new step canceled");
            });
            console.log("Test");
        };

        $scope.removeStep = function() {
            var lastItem = $scope.recipe.steps.length-1;
            $scope.recipe.steps.splice(lastItem);
        };

        function showSimpleToast(txt) {
            $mdToast.show(
                $mdToast.simple()
                    .textContent(txt)
                    .position('bottom-right')
                    .hideDelay(3000)
            );
        }

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
