/**
 * Created by flori on 29.06.2016.
 */

'use strict';

angular.module('myApp.create')

    .factory('ingredientService', function($http) {
        var getIngredients = function(callbackFn) {
            $http.get('http://localhost:3000/api/ingredients').success(function(data) {
                callbackFn(data);
            });
        };

        return {
            getIngredients: getIngredients
        };
    })
    .service('sharedIngredientList', function () {
        var ins = [];

        return {
            getSharedIngredientList: function () {
                return ins;
            },
            addSharedIngredient: function(value) {
                ins.push(value);
            }
        };
    });