'use strict';

angular.module('myApp.orders')

    .constant('orderState', {
        name: 'orders.list',
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
                    templateUrl: 'views/order/order.html',
                    controller: 'OrderCtrl',
                }
            }
        }
    })

    .controller('OrderCtrl', function ($scope, UserOrderService, UserOpenOrderService, currUser, UpdateOrderStatusService, $mdDialog, $state) {
        $scope.orders = UserOrderService.query(({userId: currUser.getUser()._id}));

        UserOpenOrderService.sendConfirmation(currUser.getUser()._id, function(data){
            if (Object.keys(data).length == 0) {
                $scope.enableCheckout = false;
            } else {
                $scope.enableCheckout = true;
            }
        });
        
        $scope.selected = ['open'];
        $scope.toggle = function (item, list) {
            var idx = list.indexOf(item);
            if (idx > -1) list.splice(idx, 1);
            else list.push(item);
        };

        $scope.exists = function (item, list) {
            return list.indexOf(item) > -1;
        };

        $scope.filterArray = function(order) {
            if(typeof($scope.selected) !== 'undefined') {
                if($scope.selected === 0) return true;
                return ($scope.selected.indexOf(order.orderStatus) !== -1);
            } else
                return true;
        };

        $scope.deleteOrder = deleteOrder;

        function deleteOrder(id, ev) {

            var confirm = $mdDialog.confirm()
                .title('Are you sure you want to delete this order?')
                .targetEvent(ev)
                .ok('Yes')
                .cancel('No');

            var toastText;
            $mdDialog.show(confirm).then(function () {
                UpdateOrderStatusService.sendConfirmation(id, 'deleted' ,function (data) {
                    $state.reload();
                    console.log(data);
                });
            }, function () {
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
    });

