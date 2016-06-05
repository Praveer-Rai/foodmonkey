'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', ['ui.router', 'myApp.recipes', 'templates', 'ngMaterial', 'ngMessages'])

    .config(function($stateProvider, $mdThemingProvider ,$urlRouterProvider, $mdIconProvider, $resourceProvider, $httpProvider) {

        // For any unmatched url, redirect to /recipes
        $urlRouterProvider.otherwise("/recipes");

        $mdThemingProvider.theme('foodMonkey').primaryPalette('teal')
        $mdThemingProvider.setDefaultTheme('foodMonkey');


        $stateProvider
            .state('root', {

                abstract: true,
                templateUrl: "views/root/root.html"
            });

        $mdIconProvider
            .iconSet('content', 'libs/material-design-icons/sprites/svg-sprite/svg-sprite-content.svg')
            .iconSet('action', 'libs/material-design-icons/sprites/svg-sprite/svg-sprite-action.svg')
            .iconSet('editor', 'libs/material-design-icons/sprites/svg-sprite/svg-sprite-editor.svg')
            .iconSet('navigation', 'libs/material-design-icons/sprites/svg-sprite/svg-sprite-navigation.svg');

        //this overrides the defaults actiosn for all $resources
        angular.extend($resourceProvider.defaults.actions, {

            update: {
                method: "PUT"
            }

        });

        $httpProvider.interceptors.push('reqErrInterceptor');
        //auth interceptor
        $httpProvider.interceptors.push('authInterceptor');
        

    });
