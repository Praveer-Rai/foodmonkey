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
    .controller('RecipeDetailCtrl', function($scope, Recipe, Comment, OrderService, CommentService, CurrentCommentService, $mdToast, $rootScope, $mdDialog, $mdMedia, $stateParams, $state, $window, currUser) {

        $scope.recipe = Recipe.get({recipeId: $stateParams.recipeId});
        $scope.price = 0;


        CommentService.getComments()
            .success(function(data){
                $scope.comments = data;
            });

        this.commentText = '';

        $scope.mayDelete;
        $scope.deleteRecipe = deleteRecipe;
        $scope.addNewComment = addNewComment;
        $scope.sameUser = sameUser;
        $scope.showEditCommentDialog = showEditCommentDialog;
        $scope.updateCommentList = updateCommentList;

        $scope.recipe.$promise.then(function(){
            $scope.mayDelete = $scope.recipe.user._id && $scope.recipe.user._id == currUser.getUser()._id;
            for(var i in $scope.recipe.ingredients){
                if(typeof $scope.recipe.ingredients[i].price != undefined)
                $scope.price += $scope.recipe.ingredients[i].price;
            }
        });

        $scope.$watch(function(){
            return currUser.loggedIn();
        }, function(loggedIn){
            if (!loggedIn) {
                $scope.mayDelete = false;
                $scope.mayEdit = false;
            } else {
                $scope.loggedIn = loggedIn;
                $scope.mayEdit = true;
                $scope.mayDelete = $scope.recipe.user == currUser.getUser()._id;
            }
        });

        function updateCommentList(){
            CommentService.getComments()
                .success(function(data){
                    $scope.comments = data;
                });
        }

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
                    .position('bottom right')
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

        $scope.addToShoppingCart = function(ev){
            var order = new OrderService();
            order.user = currUser.getUser()._id;
            order.date = new Date();
            order.ingredients = $scope.recipe.ingredients;
            order.cost = $scope.price;

            var confirm = $mdDialog.prompt()
                .title('Add ingredients to shopping cart?')
                .targetEvent(ev)
                .placeholder('Amount of persons')
                .ok('Yes')
                .cancel('Cancel');

            $mdDialog.show(confirm).then(function(result){
                order.amount = Math.floor(result);
                return order.$save().then(function(){
                    console.log(result);
                    showSimpleToast("Ingredients added to shopping cart!");
                });
            }, function() {
                showSimpleToast("Adding to shopping cart canceled");
            });


        }


        function addNewComment() {

            var newComment = new Comment();

            newComment.txt = this.commentText;
            newComment.creator = currUser.getUser();
            newComment.forRecipe = $stateParams.recipeId;

            $scope.recipe.comments.push(newComment);

            Comment.save(newComment, function(res){
                console.log(res._id);
            });

            Recipe.save($scope.recipe, function(response){
                console.log(response);
            });

            var confirm = $mdDialog.confirm()
                .title('Comment Added Successfully')
                .ok('Yes')

            $mdDialog.show(confirm).then(function() {
                $scope.updateCommentList();
            });

            this.commentText = null;
        }

        function showEditCommentDialog(currComment) {
            CurrentCommentService.setCurrentComment(currComment);
            console.log(CurrentCommentService.getCurrentComment());

            var useFullScreen = $mdMedia('s');
            $mdDialog.show({
                controller: 'editCommentCtrl',
                templateUrl: 'components/comment/edit-comment-dialog.html',
                clickOutsideToClose:true,
                fullscreen: useFullScreen
            });

            $scope.$on('Comments Updated', function(){
                $scope.updateCommentList();
            })
        }

        function sameUser(creator){
            if (currUser.getUser()._id == creator._id){
                return true;
            } else {
                return false;
            }
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
    });