/*
** QuestLogger created by Rafael De Jongh, Inias Van Ingelgom, Evelyne Vas Esbroeck and Nico Bosmans.
** This webapplication is licensed under a Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License.
**/
"use strict";
/*Global Variables
------------------*/
var app = angular.module('QuestLogger', []);
var nDate = new Date();
var hours = nDate.getHours();
var minutes = nDate.getMinutes();
var seconds = nDate.getSeconds();
/*Clock
------------------*/
app.controller('clock', function ($scope) {
  $scope.clock = {clock:nDate};
    var updateClock = function(){
		$scope.clock.now = (new Date().getHours()<10?'0':'') + new Date().getHours() + ':' + (new Date().getMinutes()<10?'0':'') + new Date().getMinutes() + ':' + (new Date().getSeconds()<10?'0':'') + new Date().getSeconds();};
    setInterval(function(){$scope.$apply(updateClock);},500);
    updateClock();
});
/*ToDoList
------------------*/
app.controller('toDoC', function ($scope) {
    $scope.saved = localStorage.getItem('todos');
    $scope.todos = (localStorage.getItem('todos')!==null) ? JSON.parse($scope.saved) : [];
    localStorage.setItem('todos', JSON.stringify($scope.todos));
    $scope.placeholder = "Add a new Quest!";
    $scope.markAll = false;
    //addToDo
    $scope.addTodo = function() {
        if($scope.todoText){
            $scope.todos.push({text:$scope.todoText, done:false});
            $scope.todoText = "";
			localStorage.setItem('todos', JSON.stringify($scope.todos));
        }
    };
    $scope.isTodo = function(){
		return $scope.todos.length > 0;  
    };
    //Toggle Edit Mode
    $scope.toggleEditMode = function(){
		$(event.target).closest('li').toggleClass('editing');
    };
    //Remaining
    $scope.remaining = function() {
        var count = 0;
        angular.forEach($scope.todos, function(todo) {
            count += todo.done ? 0 : 1;
        });
		return count;
    };
    //isDone
    $scope.hasDone = function() {return($scope.todos.length != $scope.remaining());};
    //itemText
    $scope.itemText = function() {return($scope.todos.length - $scope.remaining() > 1) ? "items" : "item";};
    //ToggleAll
    $scope.toggleMarkAll = function() {
        angular.forEach($scope.todos, function(todo) {
        todo.done =$scope.markAll;
      });
    };
    //Clear
    $scope.clear = function() {
        var oldTodos = $scope.todos;
        $scope.todos = [];
        angular.forEach(oldTodos, function(todo) {
          if (!todo.done) $scope.todos.push(todo);
        });
	localStorage.setItem('todos', JSON.stringify($scope.todos));
    };
});
/*Switches
------------------*/
app.controller('secondsSwitch', function ($scope) {
    $scope.secondsSwitch = "on";
    $scope.$watch('secondsSwitch', function () {
        if ($scope.secondsSwitch == "off") {
            //Remove clock
            $("time").addClass("none");
        } else {
            //Add clock
            $("time").removeClass("none");
        }
    });
});
/*Progress Bar
------------------*/
var progress = 0;
var int = setInterval(frame, 50);
function frame() {
   if (progress >= 100) {
        clearInterval(int);
    } else {
        progress++; 
        $("progress").attr("value", progress); 
        $("#progression span").html(progress * 1);
    }
}
/*Hash URL Check
------------------*/
$(document).ready(function() {
    if(window.location.hash == "#avatar"){$("#avatar").removeClass("none")}
    if(window.location.hash == "#addlist"){$("#addlist").removeClass("none")}
    if(window.location.hash == "#lists"){$("#lists").removeClass("none")}
    if(window.location.hash == "#styles"){$("#styles").removeClass("none")}
    if(window.location.hash == "#settings"){$("#settings").removeClass("none")}
    if(window.location.hash == "#about"){$("#about").removeClass("none")}
});
/*Jquery
------------------*/
$(function(){
    $(".content").draggable({containment:"main",scroll:false}).resizable({containment:"main"});
    $("a.close").closest("a.close").click(function(e){e.preventDefault();$(this).closest(".content").addClass("none")});
	$("a.maximize").click(function(e){e.preventDefault();$(this).addClass("none").next().removeClass("none").closest(".content").addClass("maximized")});
	$("a.minimize").click(function(e){e.preventDefault();$(this).addClass("none").prev().removeClass("none").closest(".content").removeClass("maximized")});
    $("nav a").click(function(){$($(this).attr("href")).removeClass("none").siblings(".content").addClass("none");});
});
/*Avatars
------------------*/
app.controller('avatars', function($scope){
	$scope.avatar = [
		{
            name: 'White Male',
			img: 'images/avatars/mwh.png',
            class: 'mwh'
        },
				{
            name: 'Brown Male',
			img: 'images/avatars/mbr.png',
            class: 'mbr'
        },
		{
            name: 'Black Male',
			img: 'images/avatars/mbl.png',
            class: 'mbl'
        },
		{
            name: 'White Female',
			img: 'images/avatars/fwh.png',
            class: 'fwh'
        },
		{
            name: 'Brown Female',
			img: 'images/avatars/fbr.png',
            class: 'fbr'
        },
		{
            name: 'Black Female',
			img: 'images/avatars/fbl.png',
            class: 'fbl'
        }
    ];
});
$(function(){
   $(".avatars img").click(function(){
      var avaClass = $(this).attr("class").split(" ")[0];
      $(".avatars img").removeClass("currentAvatar");
      $(this).closest("img").addClass("currentAvatar");
      $(".ava").removeClass("fa-user mwh mbr mbl fwh fbr fbl").addClass(avaClass + " fa-blank");
    }); 
});
/*StyleChanger
------------------*/
app.controller('styles', function($scope){
	$scope.style = [
        {
            name: 'Into The Woods',
            img: 'images/backgrounds/intoTheWoodsDay.png',
            class: 'theme1'
        },
        {
            name: 'The Raging Hills',
            img: 'images/backgrounds/theRagingHillsDay.png',
            class: 'theme2'
        },
        {
            name: 'Elegancy',
            img: 'images/backgrounds/theCalmingBeachDay.png',
            class: 'theme3'
        },
        {
            name: 'Retrowave',
            img: 'images/backgrounds/RetrowaveDay.jpg',
            class: 'theme4'
        }
    ];
});
$(function(){
   $(".theme img").click(function(){
      var themeClass = $(this).attr("class");
      $(".theme img").removeClass("currentTheme");
      $(this).closest("img").addClass("currentTheme");
      $("body").removeClass("theme1 theme2 theme3 theme4 kcode").addClass(themeClass).removeClass("currentTheme");
    }); 
});
/*Day-NightCycle
------------------*/
$(function(){
        if(hours >= 7 && hours < 17){
            $("body").removeClass("night evening");
            $("body").addClass("day");
            $(".theme .theme1").attr("src", "images/backgrounds/intoTheWoodsDay.png");
            $(".theme .theme2").attr("src", "images/backgrounds/theRagingHillsDay.png");
            $(".theme .theme3").attr("src", "images/backgrounds/theCalmingBeachDay.png");
            $(".theme .theme4").attr("src", "images/backgrounds/RetrowaveDay.jpg");
        }else if(hours >= 17 && hours <= 20){
            $("body").removeClass("day night");
            $("body").addClass("evening");
            $(".theme .theme1").attr("src", "images/backgrounds/intoTheWoodsEvening.png");
            $(".theme .theme2").attr("src", "images/backgrounds/theRagingHillsEvening.png");
            $(".theme .theme3").attr("src", "images/backgrounds/theHowlingDesertEvening.png");
            $(".theme .theme4").attr("src", "images/backgrounds/RetrowaveEvening.jpg");
        }else{
            $("body").removeClass("day evening");
            $("body").addClass("night");
            $(".theme .theme1").attr("src", "images/backgrounds/intoTheWoodsNight.png");
            $(".theme .theme2").attr("src", "images/backgrounds/theRagingHillsNight.png");
            $(".theme .theme3").attr("src", "images/backgrounds/theSilentMoonNight.png");
            $(".theme .theme4").attr("src", "images/backgrounds/RetrowaveNight.jpg");
        }
});
/*Copyright
------------------*/
app.controller('team', function($scope){
	$scope.people = [
        {
            name: 'Rafaël De Jongh',
            img: 'images/team/rafael.jpg',
            link: 'http://rafaeldejongh.com/'
        },
        {
            name: 'Inias Van Ingelgom',
            img: 'images/team/inias.jpg',
            link: 'https://www.behance.net/Hystrix'
        },
        {
            name: 'Evelyne Van Esbroeck',
            img: 'images/team/evelyne.jpg',
            link: 'http://evephotography.cloudaccess.host'
        },
        {
            name: 'Nico Bosmans',
            img: 'images/team/nico.jpg',
            link: 'https://www.facebook.com/bosmansnico'
        }
    ];
    $scope.cDate = nDate.getFullYear();
});
/*EasterEggs
------------------*/
var kkeys = [], kcode = "38,38,40,40,37,39,37,39,66,65";
$(document).keydown(function(e) {
  kkeys.push(e.keyCode);
  if (kkeys.toString().indexOf( kcode ) >= 0 ){
    $(document).unbind('keydown',arguments.call);
	window.open('http://games.freearcade.com/Contra.flash/ContraFlash.swf', '_blank');
  }
});