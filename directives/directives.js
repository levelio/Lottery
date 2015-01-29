/**
 * Created by hezhiqiang on 15/1/21.
 */


angular.module('ngPrize.directives', [])
    .directive('prizeLoadTb', function () {
        return {
            restrict: 'E',
            templateUrl: 'directives/prizeTBBox.html',
            replace: true,
            scope: {
                prizes: '='
            },
            link: function ($scope, $element, $attr) {
            }
        }
    }).directive('prizeLoadLr', function () {
        return {
            restrict: 'E',
            templateUrl: 'directives/prizeLRBox.html',
            replace: true,
            scope: {
                prizes: '='
            },
            link: function ($scope, $element, $attr) {
            }
        }
    }).directive('endDialog', function () {
        return {
            restrict: 'E',
            templateUrl: 'directives/endDialog.html',
            replace: true,
            scope: {
                prize: '=',
                gameState: '='
            },
            link: function ($scope, $element, $attr) {
                $scope.close = function () {
                    $scope.gameState = 'ready';
                };
            }
        }
    }).directive('ngEnter', function () {
        return function (scope, element, attrs) {
            element.bind("keydown keypress", function (event) {
                if (event.which === 32) {
                    scope.$apply(function () {
                        scope.$eval(attrs.ngEnter);
                    });

                    event.preventDefault();
                }
            });
        };
    });