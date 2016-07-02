angular.module('myApp')
    .directive('mvSidebar', function() {
        return {
            restrict: "A",
            templateUrl: "components/sidebar/sidebar.html",
            controller: function($scope, $mdSidenav) {
                $scope.showMobileMainHeader = true;
                $scope.openSideNavPanel = function() {
                    $mdSidenav('left').open();
                };
                $scope.closeSideNavPanel = function() {
                    $mdSidenav('left').close();
                };
            }
        }
    });