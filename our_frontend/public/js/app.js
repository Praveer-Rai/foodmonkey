'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', ['ui.router', 'myApp.recipes', 'myApp.home', 'templates', 'ngMaterial', 'ngMessages'])

    .config(["$stateProvider", "$mdThemingProvider", "$urlRouterProvider", "$mdIconProvider", "$resourceProvider", "$httpProvider", function($stateProvider, $mdThemingProvider ,$urlRouterProvider, $mdIconProvider, $resourceProvider, $httpProvider) {

        // For any unmatched url, redirect to homepage
        $urlRouterProvider.otherwise("/home");

        //$mdThemingProvider.theme('foodMonkey').primaryPalette('teal').backgroundPallete('indigo')
       // $mdThemingProvider.setDefaultTheme('foodMonkey');

        $mdThemingProvider
            .theme('default')
            .primaryPalette('teal')
            .accentPalette('pink')
            .warnPalette('red')
            .backgroundPalette('blue-grey');


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
        

    }]);

angular.module('myApp.recipes', ['ngResource', 'ui.router'])

.config(["$stateProvider", "$urlRouterProvider", "recipeDetailsState", "recipeListState", function ($stateProvider,   $urlRouterProvider, recipeDetailsState, recipeListState) {
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

}]);






(function(){

    authInterceptor.$inject = ["BASEURL", "auth"];
    angular.module('myApp')
        .factory("authInterceptor", authInterceptor);

    function authInterceptor(BASEURL, auth) {

        function req(config){
            // automatically attach Authorization header
            if(config.url.indexOf(BASEURL) === 0 && auth.isAuthed()) {
                var token = auth.getToken();
                config.headers.Authorization = 'JWT ' + token;
            }

            return config;

        }

        function res(res){

            // If a token was sent back, save it
            if(res && res.config.url.indexOf(BASEURL) === 0 && res.data.token) {
                auth.saveToken(res.data.token);
            }

            return res;

        }

        return {
            request: req,
            response: res
        };
    }

})();
(function(){

    authService.$inject = ["$window"];
    angular.module('myApp')
        .service('auth', authService);

    function authService($window) {

        var self = this;
        this.token;


        this.isAuthed = isAuthed;
        this.parseJwt = parseJwt;
        this.saveToken = saveToken;
        this.getToken = getToken;
        this.deleteToken = deleteToken;

        function saveToken(t) {
            $window.localStorage['jwtToken'] = t;
        }

        function getToken() {
            return $window.localStorage['jwtToken'];
        }

        function deleteToken() {
            $window.localStorage.removeItem('jwtToken');
        }

        function parseJwt(token) {
            var base64Url = token.split('.')[1];
            var base64 = base64Url.replace('-', '+').replace('_', '/');
            return JSON.parse($window.atob(base64));
        }

        function isAuthed() {

            var token = self.getToken();
            return !!token;
        }
    }

})();

(function(){

    currUserService.$inject = ["BASEURL", "$http", "auth"];
    angular.module('myApp')
        .service('currUser', currUserService);

    function currUserService(BASEURL, $http, auth) {

        this.register = register;
        this.login = login;
        this.loggedIn = auth.isAuthed;
        this.logout = auth.deleteToken;
        this.getUser = getUser;


        ////////////////

        function register(firstName, lastName, email, user, pass) {
            return $http.post(BASEURL + '/signup', {
                firstName: firstName,
                lastName: lastName,
                email: email,
                username: user,
                password: pass
            });
        }

        function login(user, pass) {
            return $http.post(BASEURL + '/login', {
                username: user,
                password: pass
            });
        }

        function getUser() {
            var token = auth.getToken();
            return token? auth.parseJwt(token).user : {};
        }
    }

})();

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
//taken from http://stackoverflow.com/a/31671397/3200478

angular.module('myApp')
    .directive("compareTo", function () {
        return {
            require: "ngModel",
            scope: {
                otherModelValue: "=compareTo"
            },
            link: function (scope, element, attributes, ngModel) {

                ngModel.$validators.compareTo = function (modelValue) {
                    return modelValue == scope.otherModelValue;
                };

                scope.$watch("otherModelValue", function () {
                    ngModel.$validate();
                });
            }
        };
    });

/**
 * One can implmenet a config service if configuration more complex than constants is required
 */
angular.module('myApp')
    .constant("BASEURL", "http://localhost:3000");
angular.module('myApp.home', ['ngResource', 'ui.router'])

.config(["$stateProvider", "$urlRouterProvider", "homeState", function ($stateProvider,   $urlRouterProvider, homeState) {
    $stateProvider

        .state('home', {

            // With abstract set to true, that means this state can not be explicitly activated.
            // It can only be implicitly activated by activating one of its children.
            abstract: true,
            parent: 'root',

            // This abstract state will prepend '/recipes' onto the urls of all its children.
            url: '/home',

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
        .state(homeState.name, homeState.options)
    

}]);






angular.module('myApp')
    .controller("login", ["$scope", "currUser", "$mdDialog", function ($scope, currUser, $mdDialog) {
        $scope.username = '';
        $scope.pwd = '';
        $scope.errorText = '';

        $scope.login = login;
        $scope.cancel = cancel;

        function login() {
            currUser.login($scope.username, $scope.password).then(function () {
                $mdDialog.hide();
            }, function (response) {
                if (response.status == 400 || response.status == 401) {
                    $scope.errorText = "Wrong username or password.";
                } else {
                    $scope.errorText = "An unknown error occured. please try again later.";
                }
            });
        }

        function cancel() {
            $mdDialog.cancel();
        }
    }]);

/**
 * Created by flori on 05.06.2016.
 */
'use strict';

angular.module('myApp.recipes')

    .directive('mvRecipeCard', function() {
        return {
            restrict: 'A',
            scope: {
                recipe: '='
            },
            templateUrl: 'components/recipe-card/recipe-card.html'
        };
    });

'use strict';

angular.module('myApp.recipes')

    .factory('Recipe', ["$resource", function($resource) {
        return $resource('http://localhost:3000/api/recipes/:recipe_id', {recipe_id: '@_id'});
    }]);
angular.module('myApp')
    .controller("register", ["$scope", "currUser", "$mdDialog", function ($scope, currUser, $mdDialog) {
        $scope.username = '';
        $scope.pwd = '';
        $scope.pwdConfirm = '';
        $scope.errorText = '';
        $scope.email = '';
        $scope.firstName = '';
        $scope.lastName = '';

        $scope.register = register;
        $scope.cancel = cancel;

        function register() {
            currUser.register($scope.firstName, $scope.lastName, $scope.email, $scope.username, $scope.pwd).then(function () {
                $mdDialog.hide();
            }, function (response) {
                debugger;
                if (response.status == 400 || response.status == 401) {
                    $scope.errorText = "An unknown error occured. please try again later.";
                }
            });
        }

        function cancel() {
            $mdDialog.cancel();
        }
    }]);

(function () {

    reqErrInterceptor.$inject = ["BASEURL", "$injector", "$q"];
    angular.module('myApp')
        .factory("reqErrInterceptor", reqErrInterceptor);

    function reqErrInterceptor(BASEURL, $injector, $q) {


        return {
            responseError: responseError
        };

        //////////////////////////////

        function responseError(rej) {
            if ([-1, 404].indexOf(rej.status) !== -1) {
                showAlert({title: 'Connection Error', msg: 'Could not reach the server. Try again later'});
            } else {
                showAlert({title: 'Unknown Error', msg: 'Unknown error. Try again later'});
            }

            return $q.reject(rej);
        }

        function showAlert(opt) {
            //inject manually to resolve circular dependency error
            var $mdDialog = $injector.get('$mdDialog');
            var alert = $mdDialog.alert({
                title: opt.title,
                textContent: opt.msg,
                ok: 'Close'
            });

            $mdDialog.show(alert)

        }

    }

})();
angular.module('myApp')
    .directive('mvToolbar', function() {
        return {
            restrict: "A",
            templateUrl: "components/toolbar/toolbar.html",
            controller: ["$scope", "currUser", "$mdDialog", "$mdMedia", "$mdToast", function($scope, currUser, $mdDialog, $mdMedia, $mdToast) {

                $scope.user = null;


                $scope.showLoginDialog = showLoginDialog;
                $scope.showSignupDialog = showSignupDialog;
                $scope.logout = logout;

                $scope.$watch(function(){
                    return currUser.loggedIn();
                }, function(loggedIn){
                    $scope.loggedIn = loggedIn;
                    if (loggedIn && !$scope.user) {
                        $scope.user = currUser.getUser();
                    }
                });



                /////////////////////

                function showLoginDialog(){
                    var useFullScreen = $mdMedia('xs');
                    $mdDialog.show({
                        controller: 'login',
                        templateUrl: 'components/login-dialog/login-dialog.html',
                        clickOutsideToClose:true,
                        fullscreen: useFullScreen
                    });
                };
                function showSignupDialog(){
                    var useFullScreen = $mdMedia('xs');
                    $mdDialog.show({
                        controller: 'register',
                        templateUrl: 'components/register-dialog/register-dialog.html',
                        clickOutsideToClose:true,
                        fullscreen: useFullScreen
                    });
                };

                function logout(){
                    currUser.logout();
                }

                function showSimpleToast(txt){
                    $mdToast.show(
                        $mdToast.simple()
                            .textContent(txt)
                            .position('bottom right')
                            .hideDelay(3000)

                    );
                }
            }]
        }
    });
'use strict';

angular.module('myApp.recipes')

    .constant('recipeDetailsState', {
        name: 'recipes.detail',
        options: {
            url: '/{recipeId}',

            views: {
                "content@root": {
                    templateUrl: 'views/detail/recipe-detail.html',
                    controller: 'RecipeDetailCtrl'
                }
            },

            resolve: {
                //we abuse the resolve feature for eventual redirection
                redirect: function($state, $stateParams, Recipe, $timeout, $q){
                    var mid = $stateParams.recipeId;
                    if (!mid) {
                        //timeout because the transition cannot happen from here
                        $timeout(function(){
                            $state.go("recipes.list");
                        });
                        return $q.reject();
                    }
                }
            }

        }
    })
    .controller('RecipeDetailCtrl', ["$scope", "Recipe", "$mdToast", "$mdDialog", "$stateParams", "$state", "currUser", "$http", function($scope, Recipe, $mdToast, $mdDialog, $stateParams, $state, currUser, $http) {

        $scope.recipe = Recipe.get({recipeId: $stateParams.recipeId});

        $scope.commentText = '';

        $scope.mayDelete;
        $scope.mayEdit = currUser.loggedIn();
        $scope.deleteRecipe = deleteRecipe;
        $scope.updateRecipe = updateRecipe;
        $scope.addNewComment = addNewComment;
        $scope.cancelEditingRecipe = function(){ showSimpleToast("Editing cancelled"); };

        $scope.recipe.$promise.then(function(){
            $scope.mayDelete = $scope.recipe.user && $scope.recipe.user == currUser.getUser()._id;
        });

        $scope.$watch(function(){
            return currUser.loggedIn();
        }, function(loggedIn){
            if (!loggedIn) {
                $scope.mayDelete = false;
                $scope.mayEdit = false;
            } else {
                $scope.mayEdit = true;
                $scope.mayDelete = $scope.recipe.user == currUser.getUser()._id;
            }
        });

        ////////////////////


        function updateRecipe(changed) {

            if (!changed) {
                showSimpleToast("no change");
                return;
            }

            $scope.recipe.$update().then(function(updated){
                $scope.recipe = updated;
                showSimpleToast("update successfull");
            }, function(){
                showSimpleToast("error. please try again later");
            });
        }

        function deleteRecipe(ev) {

            var confirm = $mdDialog.confirm()
                .title('Are you sure you want to delete this recipe?')
                .targetEvent(ev)
                .ok('Yes')
                .cancel('Abort');

            var toastText;
            $mdDialog.show(confirm).then(function() {
                return $scope.recipe.$remove().then(function() {
                    return $state.go('recipes.list');
                }).then(function(){
                    showSimpleToast('Recipe deleted successfully');
                }, function() {
                    showSimpleToast("Error. Try again later");
                });
            }, function() {
                showSimpleToast("delete aborted");
            })
        }

        function showSimpleToast(txt) {
            $mdToast.show(
                $mdToast.simple()
                    .textContent(txt)
                    .position('bottom right')
                    .hideDelay(3000)
            );
        }

        function addNewComment() {
            var text = $scope.commentText;

            return $http.post('/recipes/:recipe_id', text)
                .success(function(){
                    console.log('New Comment Added');
                })
        }
    }]);
'use strict';

angular.module('myApp.home')

    .constant('homeState', {
        name: 'home.view',
        options: {

            // Using an empty url means that this child state will become active
            // when its parent's url is navigated to. Urls of child states are
            // automatically appended to the urls of their parent. So this state's
            // url is '/home' (because '/home' + '').
            url: '',

            // IMPORTANT: Now we have a state that is not a top level state. Its
            // template will be inserted into the ui-view within this state's
            // parent's template; so the ui-view within contacts.html. This is the
            // most important thing to remember about templates.
            views: {
                'content@root': {
                    templateUrl: 'views/home/home.html',
                }
            }

        }

    })




'use strict';

angular.module('myApp.recipes')

    .constant('recipeListState', {
        name: 'recipes.list',
        options: {

            // Using an empty url means that this child state will become active
            // when its parent's url is navigated to. Urls of child states are
            // automatically appended to the urls of their parent. So this state's
            // url is '/recipes' (because '/recipes' + '').
            url: '',

            // IMPORTANT: Now we have a state that is not a top level state. Its
            // template will be inserted into the ui-view within this state's
            // parent's template; so the ui-view within contacts.html. This is the
            // most important thing to remember about templates.
            views: {
                'content@root': {
                    templateUrl: 'views/list/recipe-list.html',
                    controller: 'RecipeListCtrl',
                }
            }

        }

    })

    .controller('RecipeListCtrl', ["$scope", "Recipe", function($scope, Recipe) {
        $scope.recipes = Recipe.query();

    }])

