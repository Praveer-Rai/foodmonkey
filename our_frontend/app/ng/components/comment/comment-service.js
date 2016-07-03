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
    })

    .service('CurrentCommentService', function(){
        var currentComment = {};

        return {
            getCurrentComment: function(){
                return currentComment;
            },

            setCurrentComment: function(currComment){
                currentComment = currComment;
            }
        }
    })

    .factory('EditCommentService', function($http, $resource, CurrentCommentService){
        var comment = {};

        comment.updateComment = function(newText){
            return $http({
                url: 'http://localhost:3000/api/comments/:comment_id',
                method: 'PUT',
                data: {txt: newText},
                params: {comment_id: CurrentCommentService.getCurrentComment()._id}
            })
        };

        return comment;
    })

    .factory('DeleteCommentService', function($http, $stateParams, CurrentCommentService){
        var comment = {};

        comment.deleteComment = function(){
            return $http({
                url: 'http://localhost:3000/api/comments/:comment_id',
                method: 'DELETE',
                params: {comment_id: CurrentCommentService.getCurrentComment()._id}
            })
        };

        return comment;

    });
