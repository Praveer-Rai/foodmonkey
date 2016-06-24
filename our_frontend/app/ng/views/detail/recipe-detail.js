'use strict';

angular.module('myApp.recipes')

    .constant('recipeDetailsState', {
        name: 'recipes.detail',
        options: {
            url: '/{recipeId}',

            views: {
                "content@root": {
                    templateUrl: 'views/detail/recipe-detail.html',
                    controller: 'RecipeDetailCtrl'
                }
            },

            resolve: {
                //we abuse the resolve feature for eventual redirection
                redirect: function($state, $stateParams, Recipe, $timeout, $q){
                    var mid = $stateParams.recipeId;
                    if (!mid) {
                        //timeout because the transition cannot happen from here
                        $timeout(function(){
                            $state.go("recipes.list");
                        });
                        return $q.reject();
                    }
                }
            }

        }
    })
    .controller('RecipeDetailCtrl', function($scope, Recipe, $mdToast, $rootScope, $mdDialog, $stateParams, $state, currUser, $http) {

        $scope.recipe = Recipe.get({recipeId: $stateParams.recipeId});

        $scope.comment = new Comment();

        $scope.mayDelete;
        $scope.mayEdit = currUser.loggedIn();
        $scope.deleteRecipe = deleteRecipe;
        $scope.updateRecipe = updateRecipe;
        $scope.addNewComment = addNewComment;
        $scope.cancelEditingRecipe = function(){ showSimpleToast("Editing cancelled"); };

        $scope.recipe.$promise.then(function(){
            $scope.mayDelete = $scope.recipe.user && $scope.recipe.user == currUser.getUser()._id;
        });

        $scope.$watch(function(){
            return currUser.loggedIn();
        }, function(loggedIn){
            if (!loggedIn) {
                $scope.mayDelete = false;
                $scope.mayEdit = false;
            } else {
                $scope.mayEdit = true;
                $scope.mayDelete = $scope.recipe.user == currUser.getUser()._id;
            }
        });

        ////////////////////


        function updateRecipe(changed) {

            if (!changed) {
                showSimpleToast("no change");
                return;
            }

            $scope.recipe.$update().then(function(updated){
                $scope.recipe = updated;
                showSimpleToast("update successfull");
            }, function(){
                showSimpleToast("error. please try again later");
            });
        }

        function deleteRecipe(ev) {

            var confirm = $mdDialog.confirm()
                .title('Are you sure you want to delete this recipe?')
                .targetEvent(ev)
                .ok('Yes')
                .cancel('Abort');

            var toastText;
            $mdDialog.show(confirm).then(function() {
                return $scope.recipe.$remove().then(function() {
                    return $state.go('recipes.list');
                }).then(function(){
                    showSimpleToast('Recipe deleted successfully');
                }, function() {
                    showSimpleToast("Error. Try again later");
                });
            }, function() {
                showSimpleToast("delete aborted");
            })
        }

        function showSimpleToast(txt) {
            $mdToast.show(
                $mdToast.simple()
                    .textContent(txt)
                    .position('bottom')
                    .hideDelay(3000)
            );
        }

        function showSaveToast() {
            $mdToast.show(
                $mdToast.simple()
                    .textContent("Save successful")
                    .position('bottom right')
                    .hideDelay(3000)
            );
        }

        function addNewComment() {

            $scope.comment.creator = currUser.getUser()._id;

            showSimpleToast($scope.command.text);
            /*
                TO-DO: REST PUT with recipe containing the comment inside its commands array
            /*
            return $scope.post('/recipes/:recipe_id', recipe)
                .success(function(){
                    console.log('New Comment Added');
                })
            */
        }
    });