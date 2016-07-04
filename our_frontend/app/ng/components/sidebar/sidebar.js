angular.module('myApp')
    .directive('mvSidebar',function() {
        return {
            restrict: "A",
            templateUrl: "components/sidebar/sidebar.html",
            controller: function($rootScope, $scope, $mdSidenav, FilterService, UserOpenOrderService, currUser) {
                $scope.showFilters = false;
                $scope.enableFilters = function() {
                    $scope.showFilters = true;
                };

                $scope.disableFiltersAndHideSideBar = function() {
                    $scope.showFilters = false;
                    $mdSidenav('left').close();
                };

                $scope.openSideNavPanel = function() {
                    $mdSidenav('left').open();
                };
                $scope.closeSideNavPanel = function() {
                    $mdSidenav('left').close();
                };

                $scope.filters = FilterService.query();

                $scope.selected = [];
                $scope.toggle = function (item, list) {
                    var idx = list.indexOf(item);
                    if (idx > -1) list.splice(idx, 1);
                    else list.push(item);

                    $rootScope.selectedRecipeTypes = $scope.selected;
                };

                $scope.exists = function (item, list) {
                    return list.indexOf(item) > -1;
                };

            }
        }
    });