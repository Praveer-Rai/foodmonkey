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

    .factory('UserOpenOrderService', function ($resource) {
        return $resource('http://localhost:3000/api/openorders/:userId', {userId: '@_id'});
    })

    .factory('DeleteOrderService', function ($resource) {
        return $resource('http://localhost:3000/api/deleteorder/:orderId', {orderId: '@_id'});
    });