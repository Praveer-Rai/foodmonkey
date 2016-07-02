'use strict';

angular.module('myApp.recipes')

    .factory('Comment', function($resource) {
        return $resource('http://localhost:3000/api/comments/:comment_id', {comment_id: '@_id'});
    })

    .factory('CommentService', function($http, $stateParams){
        var commentList = [];

        commentList.getComments = function(){
            return $http({
                url: 'http://localhost:3000/api/comments/:recipeId',
                method: 'GET',
                params: {recipeId: $stateParams.recipeId}
            })
        };

        return commentList;
    });