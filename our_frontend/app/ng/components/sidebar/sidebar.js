angular.module('myApp')
    .directive('mvSidebar', function() {
        return {
            restrict: "A",
            templateUrl: "components/sidebar/sidebar.html",
            controller: function($scope, $mdSidenav, FilterService) {
                $scope.showMobileMainHeader = true;
                $scope.openSideNavPanel = function() {
                    $mdSidenav('left').open();
                };
                $scope.closeSideNavPanel = function() {
                    $mdSidenav('left').close();
                };
                $scope.filters = FilterService.query();
            }
        }
    });