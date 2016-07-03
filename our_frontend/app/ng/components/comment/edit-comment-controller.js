/**
 * Created by johandytantra on 3/7/16.
 */

angular.module('myApp.recipes')
    .controller("editCommentCtrl", function ($scope, Comment, EditCommentService, DeleteCommentService, CurrentCommentService, $mdDialog, $state, $window, $mdToast) {
        this.newCommentText = '';

        $scope.update = update;
        $scope.remove = remove;
        $scope.cancel = cancel;

        function update(newText) {
            var successful = $mdDialog.confirm()
                .title('Comment Edited Successfully')
                .ok('Ok');

            EditCommentService.updateComment(newText).success(function(){
                $mdDialog.show(successful).then(function(){
                    return $window.location.reload();
                })
            })
        }

        function remove(){
            var confirm = $mdDialog.confirm()
                .title('Are you sure you want to delete this comment?')
                .ok('Yes')
                .cancel('Cancel');

            var successful = $mdDialog.confirm()
                .title('Comment Deleted Successfully')
                .ok('Ok');

            $mdDialog.show(confirm).then(function() {
                DeleteCommentService.deleteComment().success(function() {
                    $mdDialog.show(successful).then(function(){
                        return $state.reload();
                    })
                })
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

        function cancel() {
            $mdDialog.cancel();
        }
    });
