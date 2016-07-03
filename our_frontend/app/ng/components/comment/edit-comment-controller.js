/**
 * Created by johandytantra on 3/7/16.
 */

angular.module('myApp.recipes')
    .controller("editCommentCtrl", function ($scope, EditCommentService, CurrentCommentService, $mdDialog, $state, $mdToast) {
        $scope.newComment = '';

        $scope.update = update;
        $scope.remove = remove;
        $scope.cancel = cancel;

        function update() {
            currUser.login($scope.username, $scope.password).then(function () {
                $mdDialog.hide();
            }, function (response) {
                if (response.status == 400 || response.status == 401) {
                    $scope.errorText = "Wrong username or password.";
                } else {
                    $scope.errorText = "An unknown error occured. please try again later.";
                }
            });
        }

        function remove(){
            var confirm = $mdDialog.confirm()
                .title('Are you sure you want to delete this recipe?')
                .ok('Yes')
                .cancel('Abort');

            var toastText;
            $mdDialog.show(confirm).then(function() {
                return EditCommentService.deleteComment().then(function() {
                    return $state.reload();
                }).then(function(){
                    showSimpleToast('Comment deleted successfully');
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

        function cancel() {
            $mdDialog.cancel();
        }
    });
