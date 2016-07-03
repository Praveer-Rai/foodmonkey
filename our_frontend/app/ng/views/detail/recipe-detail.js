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

        CommentService.getComments()
            .success(function(data){
            $scope.comments = data;
        });

        this.commentText = '';

        $scope.mayDelete;
        $scope.mayEdit = currUser.loggedIn();
        $scope.deleteRecipe = deleteRecipe;
        $scope.updateRecipe = updateRecipe;
        $scope.addNewComment = addNewComment;
        $scope.cancelEditingRecipe = function(){ showSimpleToast("Editing cancelled"); };
        $scope.sameUser = sameUser;
        $scope.showEditCommentDialog = showEditCommentDialog;
        $scope.updateCommentList = updateCommentList;

        $scope.recipe.$promise.then(function(){
            $scope.mayDelete = $scope.recipe.user && $scope.recipe.user == currUser.getUser()._id;
            console.log($scope.recipe.user);
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

        $scope.addToShoppingCart = function(){
            var order = new OrderService();
            order.user = currUser.getUser()._id;
            order.date = new Date();
            order.ingredients = $scope.recipe.ingredients;
            order.orderStatus = "open";
            OrderService.save(order, function(response){
                console.log(response);
            });
            showSimpleToast("Ingredients added to shopping cart!");
        }

        function updateCommentList() {
            CommentService.getComments()
                .success(function(data){
                    $scope.comments = data;
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

            $scope.$on('Comment List Updated', function(){
                $scope.updateCommentList();
            })
        }

        function sameUser(creator){
            return (currUser.getUser()._id == creator._id);
        }
    });