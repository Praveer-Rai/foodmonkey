'use strict';

angular.module('myApp.checkout')
    
.factory('EmailService', function($resource) {
    return $resource('http://localhost:3000/api/sendemail/:userId', {userId: '@_id'});
});