'use strict';

angular.module('myApp.checkout')
    
.factory('EmailService', function($http) {

    var sendConfirmation = function(userId, callbackFn) {

        $http.post('http://localhost:3000/api/sendemail', {
            userId: userId
        }).success(function(data){
            callbackFn(data);
        });
    };

    return {
        sendConfirmation : sendConfirmation
    };

});