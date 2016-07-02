'use strict';

angular.module('myApp.recipes')
    
.factory('FilterService', function($resource) {
    return $resource('http://localhost:3000/api/filters');
});