//Get full year
var currentYear = angular.module('cYear', [])
    currentYear.controller('year', function ($scope) {
    $scope.cDate = new Date().getFullYear(); 
});