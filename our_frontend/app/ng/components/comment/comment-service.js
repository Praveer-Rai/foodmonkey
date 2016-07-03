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
        var currentCommentId = '';

        return {
            getCurrentCommentId: function(){
                return currentCommentId;
            },

            setCurrentCommentId: function(comment_id){
                currentCommentId = comment_id;
            }
        }
    })

    .factory('EditCommentService', function($http, $stateParams, CurrentCommentService){
        var comment = {};
        
        comment.udpateComment = function(newComment){
            return $http({
                url: 'http://localhost:3000/api/comments/:comment_id',
                method: 'PUT',
                data: newComment,
                params: {comment_id: CurrentCommentService.getCurrentCommentId()}
            })
        };
        
        comment.deleteComment = function(){
            return $http({
                url: 'http://localhost:3000/api/comments/:comment_id',
                method: 'DELETE',
                params: {comment_id: CurrentCommentService.getCurrentCommentId()}
            })
        };

        return comment;
    })
