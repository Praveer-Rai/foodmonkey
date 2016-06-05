'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', ['ui.router', 'myApp.movies', 'templates', 'ncy-angular-breadcrumb', 'ngMaterial', 'ngMessages'])

    .config(["$stateProvider", "$urlRouterProvider", "$mdIconProvider", "$resourceProvider", "$httpProvider", "$breadcrumbProvider", function($stateProvider, $urlRouterProvider, $mdIconProvider, $resourceProvider, $httpProvider, $breadcrumbProvider) {

        // For any unmatched url, redirect to /movies
        $urlRouterProvider.otherwise("/movies");


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

        $breadcrumbProvider.setOptions({
            templateUrl:"components/breadcrumbs/breadcrumbs.html",
        });

    }]);

angular.module('myApp.movies', ['ngResource', 'ui.router'])

.config(["$stateProvider", "$urlRouterProvider", "movieDetailsState", "movieListState", function ($stateProvider,   $urlRouterProvider, movieDetailsState, movieListState) {
    $stateProvider

        .state('movies', {

            // With abstract set to true, that means this state can not be explicitly activated.
            // It can only be implicitly activated by activating one of its children.
            abstract: true,
            parent: 'root',

            // This abstract state will prepend '/movies' onto the urls of all its children.
            url: '/movies',

            // since we have views we do not need to define a template here
            //template: '<div ui-view></div>',

            // Use `resolve` to resolve any asynchronous controller dependencies
            // *before* the controller is instantiated. In this case, since contacts
            // returns a promise, the controller will wait until contacts.all() is
            // resolved before instantiation. Non-promise return values are considered
            // to be resolved immediately.
            //resolve: {
            //    movies: ['contacts',
            //        function( contacts){
            //            return contacts.all();
            //        }]
            //},

        })


        // Using a '.' within a state name declares a child within a parent.
        // So you have a new state 'list' within the parent 'movies' state.
        .state(movieListState.name, movieListState.options)

        .state(movieDetailsState.name, movieDetailsState.options);

}]);






/**
 * One can implmenet a config service if configuration more complex than constants is required
 */
angular.module('myApp')
    .constant("BASEURL", "http://localhost:3000");
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

        function register(user, pass) {
            return $http.post(BASEURL + '/signup', {
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

'use strict';

angular.module('myApp.movies')

    .factory('Movie', ["$resource", function( $resource) {
        return $resource('http://localhost:3000/api/movies/:movieId', {movieId: '@_id'});

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
    .controller("register", ["$scope", "currUser", "$mdDialog", function ($scope, currUser, $mdDialog) {
        $scope.username = '';
        $scope.pwd = '';
        $scope.pwdConfirm
        $scope.errorText = '';

        $scope.register = register;
        $scope.cancel = cancel;

        function register() {
            currUser.register($scope.username, $scope.pwd).then(function () {
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

'use strict';

angular.module('myApp.movies')

    .constant('movieDetailsState', {
        name: 'movies.detail',
        options: {
            url: '/{movieId}',

            views: {
                "content@root": {
                    templateUrl: 'views/detail/movie-detail.html',
                    controller: 'MovieDetailCtrl'
                }
            },

            resolve: {
                //we abuse the resolve feature for eventual redirection
                redirect: function($state, $stateParams, Movie, $timeout, $q){
                    var mid = $stateParams.movieId;
                    if (!mid) {
                        //timeout because the transition cannot happen from here
                        $timeout(function(){
                            $state.go("movies.list");
                        });
                        return $q.reject();
                    }
                }
            },
            ncyBreadcrumb: {
                // a bit ugly (and not stable), but ncybreadcrumbs doesn't support direct access
                // to a view controller yet if there are multiple views
                label: "{{$$childHead.$$childHead.movie.title}}",
                parent: "movies.list"
            }

        }
    })
    .controller('MovieDetailCtrl', ["$scope", "Movie", "$mdToast", "$mdDialog", "$stateParams", "$state", "currUser", function($scope, Movie, $mdToast, $mdDialog, $stateParams, $state, currUser) {

        $scope.movie = Movie.get({movieId: $stateParams.movieId});

        $scope.mayDelete;
        $scope.mayEdit = currUser.loggedIn();
        $scope.deleteMovie = deleteMovie;
        $scope.updateMovie = updateMovie;
        $scope.cancelEditingMovie = function(){ showSimpleToast("Editing cancelled"); }

        $scope.movie.$promise.then(function(){
            $scope.mayDelete = $scope.movie.user && $scope.movie.user == currUser.getUser()._id;
        });

        $scope.$watch(function(){
            return currUser.loggedIn();
        }, function(loggedIn){
            if (!loggedIn) {
                $scope.mayDelete = false;
                $scope.mayEdit = false;
            } else {
                $scope.mayEdit = true;
                $scope.mayDelete = $scope.movie.user == currUser.getUser()._id;
            }
        });

        ////////////////////


        function updateMovie(changed) {

            if (!changed) {
                showSimpleToast("no change");
                return;
            }

            $scope.movie.$update().then(function(updated){
                $scope.movie = updated;
                showSimpleToast("update successfull");
            }, function(){
                showSimpleToast("error. please try again later");
            });
        }

        function deleteMovie(ev) {

            var confirm = $mdDialog.confirm()
                .title('Are you sure you want to delete this movie?')
                .targetEvent(ev)
                .ok('Yes')
                .cancel('Abort');

            var toastText;
            $mdDialog.show(confirm).then(function() {
                return $scope.movie.$remove().then(function() {
                    return $state.go('movies.list');
                }).then(function(){
                    showSimpleToast('Movie deleted successfully');
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


    }]);
'use strict';

angular.module('myApp.movies')

    .constant('movieListState', {
        name: 'movies.list',
        options: {

            // Using an empty url means that this child state will become active
            // when its parent's url is navigated to. Urls of child states are
            // automatically appended to the urls of their parent. So this state's
            // url is '/movies' (because '/movies' + '').
            url: '',

            // IMPORTANT: Now we have a state that is not a top level state. Its
            // template will be inserted into the ui-view within this state's
            // parent's template; so the ui-view within contacts.html. This is the
            // most important thing to remember about templates.
            views: {
                'content@root': {
                    templateUrl: 'views/list/movie-list.html',
                    controller: 'MovieListCtrl',
                },
                'outside@root': {
                    templateUrl: 'views/list/movie-list-buttons.html',
                    controller: 'movieListButtonCtrl'
                }
            },

            ncyBreadcrumb: {
                label: "Movies"
            }

        }

    })

    .controller('MovieListCtrl', ["$scope", "Movie", function($scope, Movie) {
        $scope.movies = Movie.query();

        $scope.$on('movieCreated', function(ev, movie){
            $scope.movies.push(movie);
        });


    }])

    .controller('movieListButtonCtrl', ["$scope", "$mdMedia", "$mdDialog", "$mdToast", "currUser", function($scope, $mdMedia, $mdDialog, $mdToast, currUser){

        $scope.createMovieDialog = createMovieDialog;
        $scope.authed = false;

        $scope.$watch(function(){
            return currUser.loggedIn();
        }, function(loggedIn){
            $scope.authed = loggedIn;
        });

        ////////////////////////////////////

        function createMovieDialog(ev) {
            var useFullScreen = ( $mdMedia('xs'));
            $mdDialog.show({
                    controller: "CreateMovieCtrl",
                    templateUrl: 'components/create-movie/create-movie.html',
                    targetEvent: ev,
                    clickOutsideToClose:true,
                    fullscreen: useFullScreen,
                    preserveScope:true
                })
                .then(function(answer) {

                    if (answer) {
                        showSimpleToast('Movie saved successfully');
                    } else {
                        showSimpleToast('An Error occured!');
                    }
                }, function() {
                    showSimpleToast('Movie creation cancelled');
                });

        }

        function showSimpleToast(txt){
            $mdToast.show(
                $mdToast.simple()
                    .textContent(txt)
                    .position('bottom right')
                    .hideDelay(3000)

            );
        }
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