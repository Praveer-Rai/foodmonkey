/**
 * Created by Florian Noack on 26.06.2016.
 */

angular.module('myApp.create')
    .controller('CreateRecipeCtrl', function($scope, $timeout, Recipe, Ingredient, ingredientService, sharedIngredientList, $mdDialog, $rootScope, currUser, $mdToast, $mdMedia) {

        $scope.recipe = new Recipe();
        $scope.recipe.steps = [];
        $scope.difficulties = ('easy medium hard').split(' ').map(function(diff){
            return {abbrev:diff}
        });
        $scope.selectedItem  = null;
        $scope.searchText    = null;
        $scope.ingredients = [];
        $scope.recipeIngredients = [];
        $scope.quantity = null;

        ingredientService.getIngredients(function(ingredients) {
            $scope.ingredients = ingredients;
        });
        $timeout(function () {
            $scope.existingIngredients = loadAllIngredients();
        }, 500);

        function loadAllIngredients(){
            return $scope.ingredients.map(function(ing){
                return{
                    value: ing.name.toLowerCase(),
                    display: ing.name
                }
            });
        }

        $scope.existingIngredients = loadAllIngredients();

        $scope.querySearch = function(query){
            $scope.searchText = query;
            var results = query ? $scope.existingIngredients.filter(createFilterFor(query)) : $scope.existingIngredients;
            return results;
        }

        function createFilterFor(query) {
            var lowercaseQuery = angular.lowercase(query);
            return function filterFn(ing) {
                return (ing.value.indexOf(lowercaseQuery) === 0);
            };
        }

        function capitalize(input) {
            if (input!=null)
                input = input.toLowerCase();
            return input.substring(0,1).toUpperCase()+input.substring(1);
        }


        $scope.showAddIngredientDialog = function(ev) {
            console.log($scope.existingIngredients)
            var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))  && $scope.customFullscreen;
            $mdDialog.show({
                //controller: DialogController,
                templateUrl: 'components/create-recipe/add-ingredient-dialog.html',
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose:true,
                fullscreen: useFullScreen
            })
                .then(function(result) {
                    $scope.recipeIngredients = sharedIngredientList.getSharedIngredientList();
                    console.log(sharedIngredientList.getSharedIngredientList());
                }, function() {

                });
            $scope.$watch(function() {
                return $mdMedia('xs') || $mdMedia('sm');
            }, function(wantsFullScreen) {
                $scope.customFullscreen = (wantsFullScreen === true);
            })
        };

        $scope.addNewIngredient = function() {
            var newIngredient = new Ingredient();
            if($scope.selectedItem != null){
                for(var i in $scope.ingredients){
                    if($scope.ingredients[i].name === $scope.selectedItem.display){
                        newIngredient.name = $scope.selectedItem.display;
                        newIngredient.quantity = $scope.quantity;
                        Ingredient.save(newIngredient, function(response){
                            sharedIngredientList.addSharedIngredient(response);
                        });
                    }
                }
            }else{
                $scope.searchText = capitalize($scope.searchText)
                newIngredient.name = ($scope.searchText);
                newIngredient.quantity = $scope.quantity;
                Ingredient.save(newIngredient, function(response){
                    sharedIngredientList.addSharedIngredient(response);
                });
            }
            showSimpleToast($scope.searchText + ' added');
            $mdDialog.hide();
        };

        $scope.removeIngredient = function() {
            var lastItem = $scope.recipeIngredients.length-1;
            $scope.recipeIngredients.splice(lastItem);
        };

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
                $scope.recipe.steps.push(result);
            }, function() {
                showSimpleToast("Adding new step canceled");
            });
        };

        $scope.addPicture = function(ev) {
            var confirm = $mdDialog.prompt()
                .title('Add Picture')
                .textContent('Please enter picture URL here.')
                .placeholder('URL')
                .targetEvent(ev)
                .cancel('Cancel')
                .ok('Add Picture');
            $mdDialog.show(confirm).then(function(result) {
                showSimpleToast("Picture added")
                $scope.recipe.thumbnailImageId = result;
                $scope.recipe.mainImageId = result;
            }, function() {
                showSimpleToast("Adding picture canceled");
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
            $scope.recipe.ingredients = $scope.recipeIngredients;
            console.log($scope.recipe.prepTime);
            Recipe.save($scope.recipe, function(response){
                console.log(response);
            });
        };

        $scope.cancel = function() {
            showSimpleToast("Creating canceled");
            history.back();
        };

    });