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

    .controller('CheckoutCtrl', function ($scope, UserOpenOrderService, EmailService, currUser) {
        $scope.orders = UserOpenOrderService.query(({userId: currUser.getUser()._id}));
        if (Object.keys($scope.orders).length == 0) {
            $scope.enableCheckout = false;
        } else {
            $scope.enableCheckout = true;
        }

        EmailService.sendConfirmation(currUser.getUser()._id, function(data){
            console.log(data);
        });
        
    });

