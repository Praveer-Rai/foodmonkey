'use strict';

angular.module('myApp.orders')

    .factory('OrderService', function ($resource) {
        return $resource('http://localhost:3000/api/orders');
    })

    .factory('OpenOrderService', function ($resource) {
        return $resource('http://localhost:3000/api/openorders');
    })


    .factory('UserOrderService', function ($resource) {
        return $resource('http://localhost:3000/api/orders/:userId', {userId: '@_id'});
    })

    .factory('UserOpenOrderService', function($http) {
        var sendConfirmation = function(userId, callbackFn) {
            $http.get('http://localhost:3000/api/openorders/'+userId).success(function(data) {
                callbackFn(data);
            });
        };

        return {
            sendConfirmation: sendConfirmation
        };
    })

    .factory('UpdateOrderStatusService', function ($http) {
        var sendConfirmation = function (orderId,status,callbackFn) {

            $http.post('http://localhost:3000/api/updateorderstatus', {
                orderId: orderId,
                status: status
            }).success(function (data) {
                callbackFn(data);
            });
        };

        return {
            sendConfirmation: sendConfirmation
        };
    });

