/*
** QuestLogger created by Rafael De Jongh, Inias Van Ingelgom, Evelyne Vas Esbroeck and Nico Bosmans.
** This webapplication is licensed under a Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License.
**/
"use strict";
/*Global Variables
------------------*/
var app = angular.module('QuestLogger', []);
var nDate = new Date();
/*Current Year
------------------*/
app.controller('yearC', function ($scope) {
    $scope.cDate = nDate.getFullYear(); 
});
/*Clock
------------------*/
app.controller('clock', function ($scope) {
  $scope.clock = {clock:nDate}
    var updateClock = function(){
		$scope.clock.now = (nDate.getHours()<10?'0':'') + nDate.getHours() + ":" + (nDate.getMinutes()<10?'0':'') + nDate.getMinutes() /*+ ":" + (nDate.getSeconds()<10?'0':'') + nDate.getSeconds()*/;};
    setInterval(function(){$scope.$apply(updateClock);},1000);
    updateClock();
});
/*ToDoList
------------------*/
app.controller('toDoC', function ($scope) {
    $scope.todos = [];
    $scope.markAll = false;
    //addToDo
    $scope.addTodo = function() {
        if($scope.todoText){
            $scope.todos.push({text:$scope.todoText, done:false});
            $scope.todoText = "";
        }
    };
    $scope.isTodo = function(){
      return $scope.todos.length > 0;  
    };
    //Toggle Edit Mode
    $scope.toggleEditMode = function(){
      $(event.target).closest('li').toggleClass('editing');
    };
    //Edit
    $scope.editOnEnter = function(todo){
      if(event.keyCode == 13 && todo.text){
          $scope.toggleEditMode();
      }
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
    $scope.hasDone = function() {
      return ($scope.todos.length != $scope.remaining());
    };
    //itemText
    $scope.itemText = function() {
      return ($scope.todos.length - $scope.remaining() > 1) ? "items" : "item";     
    };
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
    };
});
/*Jquery
------------------*/
$(function(){
    $(".content").draggable({containment:"main",scroll:false});
    $("a.close").closest("a.close").click(function(){$(this).closest(".content").addClass("none")});
    $("nav a").click(function(){$($(this).attr("href")).removeClass("none").siblings(".content").addClass("none");});
});
/*StyleChanger
------------------*/
$(function(){
   $(".themeHover").click(function(){
      var myClass = $(this).attr("class");
      $(".themeHover").removeClass("currentTheme");
      $(this).addClass("currentTheme");
      $("body").removeClass("currentTheme theme1 theme2 theme3 konami");
      $("body").addClass(myClass).removeClass("themeHover");
    }); 
});
/*Day-NightCycle
------------------*/
$(function(){
    var currentTime = nDate.getHours();
        if(currentTime >= 7 && currentTime < 17){
            $("body").removeClass("night evening");
            $("body").addClass("day");
            $(".theme1").attr("src", "images/backgrounds/intoTheWoodsDay.png");
            $(".theme2").attr("src", "images/backgrounds/BG-Synth.jpg");
            $(".theme3").attr("src", "images/backgrounds/theRagingHillsDay.png");
        }else if(currentTime >= 17 && currentTime <= 20){
            $("body").removeClass("day night");
            $("body").addClass("evening");
            $(".theme1").attr("src", "images/backgrounds/intoTheWoodsEvening.png");
            $(".theme2").attr("src", "images/backgrounds/BG-Synth.jpg");
            $(".theme3").attr("src", "images/backgrounds/theRagingHillsDay.png");
        }else{
            $("body").removeClass("day evening");
            $("body").addClass("night");
            $(".theme1").attr("src", "images/backgrounds/intoTheWoodsNight.png");
            $(".theme2").attr("src", "images/backgrounds/BG-Synth.jpg");
            $(".theme3").attr("src", "images/backgrounds/theRagingHillsNight.png");
        }
});
/*EasterEggs
------------------*/
var kkeys = [], konami = "38,38,40,40,37,39,37,39,66,65";
$(document).keydown(function(e) {
  kkeys.push(e.keyCode);
  if (kkeys.toString().indexOf( konami ) >= 0 ){
    $(document).unbind('keydown',arguments.call);
  //  window.open('http://games.freearcade.com/Contra.flash/ContraFlash.swf', '_blank');
	//Add code here to do something fun!
    $("body").removeClass("theme1 theme2 theme3 day");
    $("body").addClass("night konami");
  }
});