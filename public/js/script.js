/*
** QuestLogger created by Rafael De Jongh, Inias Van Ingelgom, Evelyne Vas Esbroeck and Nico Bosmans.
** This webapplication is licensed under a Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License.
**/
"use strict";
/*Jquery
------------------*/
$(function(){
    //$(".content").draggable({containment:"main",scroll:false}).resizable({containment:"main"});
    /*$("a.close").closest("a.close").click(function(e){e.preventDefault();$(this).closest(".content").addClass("none")});
	$("a.maximize").click(function(e){e.preventDefault();$(this).addClass("none").next().removeClass("none").closest(".content").addClass("maximized")});
	$("a.minimize").click(function(e){e.preventDefault();$(this).addClass("none").prev().removeClass("none").closest(".content").removeClass("maximized")});*/
});
/*Angular Module
------------------*/
var app = angular.module('QuestLogger', ['ngRoute']);
/*Avatars
------------------*/
app.controller('avatars', function($scope){
	$scope.titel = 'Pick your avatar!';
	$scope.avatar = [
		{
            name: 'male white Short',
			img: 'images/avatars/malewhiteshort.png',
            class: 'mwhsh'
        },
		{
            name: 'male white medium',
			img: 'images/avatars/malewhitemedium.png',
            class: 'mwhme'
        },
		{
            name: 'male white beard',
			img: 'images/avatars/malewhitebeard.png',
            class: 'mwhbe'
        },
		{
            name: 'female white short',
			img: 'images/avatars/femalewhiteshort.png',
            class: 'fwhsh'
        },
		{
            name: 'female white long',
			img: 'images/avatars/femalewhitelong.png',
            class: 'fwhlo'
        },
		{
            name: 'female white pony',
			img: 'images/avatars/femalewhitepony.png',
            class: 'fwhpo'
        }
    ];
    $scope.changeAvatar = function(avatar){
        var avatar = $(event.target);
        var thisAvatar = avatar.closest("img").attr("class").split(" ")[0];
        $(".avatars img").removeClass("currentAvatar");
        avatar.addClass("currentAvatar");
        $(".ava").removeClass("fa-user mwhsh mwhme mwhbe fwhsh fwhlo fwhpo").addClass(thisAvatar + " fa-blank");
    };
});
/*ToDoList
------------------*/
app.controller('toDoC', function ($scope) {
    $scope.saved = localStorage.getItem('todos');
    $scope.todos = (localStorage.getItem('todos')!==null) ? JSON.parse($scope.saved) : [];
    localStorage.setItem('todos', JSON.stringify($scope.todos));
    $scope.titel = "Add a new Quest!";
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
/*StyleChanger
------------------*/
app.controller('styles', function($scope){
	$scope.titel = "Style Changer";
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
    $scope.changeTheme = function(theme){
        var theme = $(event.target);
        var thisTheme = theme.closest("img").attr("class").split(" ")[0];
        $(".theme img").removeClass("currentTheme");
        theme.addClass("currentTheme");
        $("body").removeClass("theme1 theme2 theme3 theme4").addClass(thisTheme);
    };
});
/*Day-NightCycle
------------------*/
$(function(){
	var hours = new Date().getHours();
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
/*Settings
------------------*/
app.controller('settings', function ($scope) {
	$scope.titel = "Settings";
    $scope.sSwitch = "on";
    $scope.$watch('sSwitch', function () {
        if ($scope.sSwitch == "off") {
            //Remove clock
            $("time").addClass("none");
        } else {
            //Add clock
            $("time").removeClass("none");
        }
    });
});
/*Team
------------------*/
app.controller('team', function($scope){
	$scope.titel = "About Quest Logger";
	$scope.cDate = new Date().getFullYear();
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
});
/*Hash Routing
------------------*/
app.config(function($routeProvider, $locationProvider) {
	//$locationProvider.html5Mode(true);
    $routeProvider
        .when('/avatar', {
        template: `
        <div id="avatar" class="content">
            <header>
                <h2>{{titel}}</h2>
				<a class="fa fa-expand maximize" href="#maximized"></a>
				<a class="fa fa-compress minimize none" href="#minimized"></a>
                <a class="fa fa-times close" href="#close"></a>
            </header>
			<div id="avatarcon">
				<div class="avatars" ng-repeat="avatars in avatar">
				   <img ng-src="{{avatars.img}}" ng-click="changeAvatar(avatar);" class="{{avatars.class}} avatar" alt="{{avatars.name}}">
					<ul>
					<li class="skincolor white"></li><li class="skincolor brown"></li><li class="skincolor black"></li>
					</ul>
				</div>
			</div>
        </div>
        `,
        controller: 'avatars'
        })
		.when('/questlogger', {
		template: `
		  <div id="addlist" class="content">
				<header>
					<h2>{{titel}}</h2>
					<a class="fa fa-expand maximize" href="#maximized"></a>
					<a class="fa fa-compress minimize none" href="#minimized"></a>
					<a class="fa fa-times close" href="#close"></a>
				</header>
		<form id="logform" ng-submit="addTodo()">
			<input type="text" ng-model="todoText" placeholder="{{titel}}" required>
			<input type="submit" value="Add Quest">
			<div ng-show="isTodo()" id="markall">
				<input id="toggle" type="checkbox" ng-model="markAll" ng-click="toggleMarkAll()">
				<label for="toggle">Mark all as complete</label>
			</div>
			<ul id="todolist">
				<li ng-repeat="todo in todos track by $index" >
					<div class="view">
						<input id="{{'questtask' + $index}}" type="checkbox" ng-model="todo.done">
						<label for="{{'questtask' + $index}}" class="done-{{todo.done}}">{{todo.text}}</label>
						<i class="fa fa-pencil-square-o editToDo" ng-click="toggleEditMode()"></i>
					</div>
					<textarea class="edit" type="text" ng-model="todo.text" ng-keyup="editOnEnter(todo)"></textarea>
						<i class="fa fa-check-square-o dnEditToDo" ng-click="toggleEditMode()"></i>
				</li>
			</ul>
		</form>    
			<a id="clear" ng-click="clear()" ng-show="hasDone()">Remove {{(todos.length - remaining())}} {{itemText()}}.</a>
			<footer class="remaining">{{remaining()}} of {{todos.length}} Quests remaining!</footer>   
        </div>
		`,
		controller: 'toDoC'
		})
		.when('/styles', {
        template: `
        <div id="styles" class="content theme">
            <header>
                <h2>{{titel}}</h2>
				<a class="fa fa-expand maximize" href="#maximized"></a>
				<a class="fa fa-compress minimize none" href="#minimized"></a>
                <a class="fa fa-times close" href="#close"></a>
            </header>
            <div ng-repeat="styles in style">
				<img ng-src="{{styles.img}}" ng-class="{currentTheme : $first}" ng-click="changeTheme($theme);" class="{{styles.class}}" alt="{{styles.name}}">
				<h5 class="themetitle">{{styles.name}}</h5>
			</div>
        </div>
        `,
        controller: 'styles'
        })
		.when('/settings', {
        template: `
        <div id="settings" class="content">
            <header>
                <h2>{{titel}}</h2>
				<a class="fa fa-expand maximize" href="#maximized"></a>
				<a class="fa fa-compress minimize none" href="#minimized"></a>
                <a class="fa fa-times close" href="#close"></a>
            </header>
            <div id="clockSwitch">
            <h5>Turn the clock on/off.</h5>
                <form class="switches">
                    <div class="toggle {{sSwitch}}">
                        <label class="{{sSwitch}}">{{sSwitch}}</label>
                        <input type="radio" name="toggle" value="off" ng-model="sSwitch">
                        <input type="radio" name="toggle" value="on" ng-model="sSwitch">
                        <span class="switch {{sSwitch}}"></span>
                        <!--<p>State:{{sSwitch}}</p>-->
                    </div> 
                </form>
            </div>
        </div>
        `,
        controller: 'settings'
        })
		.when('/about', {
        template: `
        <div id="about" class="content">
            <header>
                <h2>{{titel}}</h2>
				<a class="fa fa-expand maximize" href="#maximized"></a>
				<a class="fa fa-compress minimize none" href="#minimized"></a>
                <a class="fa fa-times close" href="#close"></a>
            </header>
            <p>Quest Logger is an Angular web-app that will help you organize all your quests!</p>
            <p>This application is created by:</p>
            <div ng-repeat="team in people" class="team">
				<a href="{{team.link}}" target="_blank">
                    <img ng-src="{{team.img}}" alt="{{team.name}}"/>
                </a>
				<h3>{{team.name}}</h3>
			</div>
            <footer>Copyright &copy; {{cDate}} | Quest Logger</footer>
        </div>
        `,
        controller: 'team'
        })
		.otherwise({ redirectTo: '/' });
});
/*Clock
------------------*/
app.directive('clock', function() {
    return {
        scope: {
            object: '=',
            view: '@'
        },
        template: `{{clock.now}}`,
        controller: function($scope) {
            $scope.theTime = $scope.object;
			$scope.clock = {clock:new Date()};
			var updateClock = function(){
			$scope.clock.now = (new Date().getHours()<10?'0':'') + new Date().getHours() + ':' + (new Date().getMinutes()<10?'0':'') + new Date().getMinutes() + ':' + (new Date().getSeconds()<10?'0':'') + new Date().getSeconds();};
			setInterval(function(){$scope.$apply(updateClock);},500);
			updateClock();
        }
    };
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