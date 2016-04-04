/*
** QuestLogger created by Rafael De Jongh, Inias Van Ingelgom, Evelyne Vas Esbroeck, Nico Bosmans
**/
"use strict";
var app = angular.module('QuestLogger', []);
app.controller('year', function ($scope) {
    $scope.cDate = new Date().getFullYear(); 
});