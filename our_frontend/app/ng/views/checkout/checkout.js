'use strict';

angular.module('myApp.checkout')

    .constant('checkoutState', {
        name: 'checkout.name',
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
                    templateUrl: 'views/checkout/checkout.html',
                    controller: 'CheckoutCtrl',
                }
            }

        }

    })

    .controller('CheckoutCtrl', function ($scope, UpdateOrderStatusService, UserOpenOrderService, EmailService, currUser) {
        UserOpenOrderService.sendConfirmation(currUser.getUser()._id, function (data) {
            $scope.orders = data;
            if (Object.keys(data).length == 0) {
                $scope.enableCheckout = false;
            } else {
                $scope.enableCheckout = true;
            }
        });

        $scope.submitOrder = function () {
            for (var i in $scope.orders) {
                UpdateOrderStatusService.sendConfirmation($scope.orders[i]._id, 'submitted', function (data) {
                    console.log(data);
                });
            }
            EmailService.sendConfirmation(currUser.getUser()._id, function (data) {
                console.log(data);
            });
        };

    });

