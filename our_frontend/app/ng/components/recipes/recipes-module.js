angular.module('myApp.recipes', ['ngResource', 'ui.router'])

.config(function ($stateProvider,   $urlRouterProvider, recipeDetailsState, recipeListState) {
    $stateProvider

        .state('recipes', {

            // With abstract set to true, that means this state can not be explicitly activated.
            // It can only be implicitly activated by activating one of its children.
            abstract: true,
            parent: 'root',

            // This abstract state will prepend '/recipes' onto the urls of all its children.
            url: '/recipes',

            // since we have views we do not need to define a template here
            //template: '<div ui-view></div>',

            // Use `resolve` to resolve any asynchronous controller dependencies
            // *before* the controller is instantiated. In this case, since contacts
            // returns a promise, the controller will wait until contacts.all() is
            // resolved before instantiation. Non-promise return values are considered
            // to be resolved immediately.
            //resolve: {
            //    recipes: ['contacts',
            //        function( contacts){
            //            return contacts.all();
            //        }]
            //},

        })


        // Using a '.' within a state name declares a child within a parent.
        // So you have a new state 'list' within the parent 'recipes' state.
        .state(recipeListState.name, recipeListState.options)

        .state(recipeDetailsState.name, recipeDetailsState.options);

});





