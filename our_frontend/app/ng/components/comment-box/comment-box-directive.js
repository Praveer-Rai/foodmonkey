'use strict';

angular.module('myApp.recipes')

    .directive('mvCommentBox', function() {
        return {
            restrict: 'A',
            scope: {
                comment: '='
            },
            templateUrl: 'comment-box.html'
        };
    });