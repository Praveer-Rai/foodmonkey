/**
 * Created by Florian Noack on 26.06.2016.
 */

angular.module('myApp.create')
    .controller('CreateRecipeCtrl', function($scope, Recipe, Ingredient, $mdDialog, $rootScope, currUser, $mdToast, $mdMedia) {

        $scope.recipe = new Recipe();
        $scope.recipe.ingredients = [];
        $scope.recipe.steps = [];
        $scope.ingrediens = [];
        $scope.difficulties = ('easy medium hard').split(' ').map(function(diff){
            return {abbrev:diff}
        });
        $scope.ingrediens = [{name: 'Cola', price: 1.20, quantity: 4}, {name: 'Beer', price: 1.80, quantity: 4}];

        $scope.showAddIngredientDialog = function(ev) {
            $scope.ingredient = new Ingredient();
            var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))  && $scope.customFullscreen;
            $mdDialog.show({
                //controller: DialogController,
                templateUrl: 'components/create-recipe/add-ingredient-dialog.html',
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose:true,
                fullscreen: useFullScreen
            })
            .then(function(addNewIngredient) {
                $scope.ingrediens.push({})
                showSimpleToast('Ingredient added');
            }, function() {
                showSimpleToast('Adding of ingredient canceled');
            });
            $scope.$watch(function() {
                return $mdMedia('xs') || $mdMedia('sm');
            }, function(wantsFullScreen) {
                $scope.customFullscreen = (wantsFullScreen === true);
            })
        };

        $scope.addNewIngredient = function() {

            $mdDialog.hide();
        };

        $scope.removeIngredient = function() {
            var lastItem = $scope.ingrediens.length-1;
            $scope.ingrediens.splice(lastItem);
        };
        /*
        $scope.addNewIngredient = function() {
            //$scope.recipe.ingredients.push($scope.ingredient);
            $scope.ingrediens.push({name: 'Cola', price: 1.20, quantity: 4});
            showSimpleToast($scope.ingredient.name + " added to recipe!");
            $mdDialog.cancel();
            console.log($scope.ingrediens.length)
        };

        $scope.removeIngredient = function() {
            var lastItem = $scope.recipe.ingrediens.length-1;
            $scope.recipe.ingrediens.splice(lastItem);
        };
         */
        $scope.cancelDialog = function(){
            $mdDialog.cancel();
            showSimpleToast("Adding new ingredient canceled");
        }

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
