'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', ['ui.router', 'myApp.recipes', 'myApp.home', 'myApp.create', 'myApp.orders', 'templates', 'ngMaterial', 'ngMessages', 'jkAngularRatingStars'])

    .config(function($stateProvider, $mdThemingProvider ,$urlRouterProvider, $mdIconProvider, $resourceProvider, $httpProvider) {

        // For any unmatched url, redirect to homepage
        $urlRouterProvider.otherwise("/home");

        //$mdThemingProvider.theme('foodMonkey').primaryPalette('teal').backgroundPallete('indigo')
       // $mdThemingProvider.setDefaultTheme('foodMonkey');

        $mdThemingProvider
            .theme('default')
            .primaryPalette('teal')
            .accentPalette('pink')
            .warnPalette('red');

        $mdThemingProvider.theme('docs-dark', 'default')
            .primaryPalette('yellow')
            .dark();

        //$mdThemingProvider.theme('recipe-list').backgroundPalette('lime').dark();

        $mdThemingProvider.alwaysWatchTheme(true);

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
