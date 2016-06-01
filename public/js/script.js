/*
** QuestLogger created by Rafael De Jongh, Inias Van Ingelgom, Evelyne Vas Esbroeck and Nico Bosmans.
** This webapplication is licensed under a Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License.
Content Table:
--------------
= Angular Modules
= Services
	- Avatar
	- Styles
	- About
	- Team
	- Settings
= Directives
	- Buttons
	- Dragging
	- Routing
	- Clock
= Misc
	- Preload
	- Day-NightCycl
**/
"use strict";
/*Angular Module
------------------*/
var app = angular.module('QuestLogger',['ngRoute']);
/*Services
------------------*/
app.service('TodoService',function(){this.getTitle = function(){return "Add a new Quest!"}});
/*AvatarService*/
app.service('AvatarService',function(){
    var avatars = [
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
	this.getTitle = function(){return "Pick Your Avatar!"};
	this.getAvatar = function(){
		return avatars;
	};
});
/*Style*/
app.service('StyleService',function(){
    var styles = [
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
	this.getTitle = function(){return "Style Changer"};
	this.getStyles = function(){return styles;}; 
});
/*Team*/
app.service('AboutService',function(){
    var teamMembers = [
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
	this.getTitle = function(){return "About Quest Logger"};
	this.getTeamMember = function(){return teamMembers;};
});
app.directive('team',function(AboutService){
	return{
		scope:{
			object: '=',
			view: '@'
		},
		template: `
			<div class="team">
				<a href="{{team.link}}" target="_blank">
					<img ng-src="{{team.img}}" alt="{{team.name}}"/>
				</a>
				<h3>{{team.name}}</h3>
			</div>
		`,
		controller: function($scope) {
			$scope.team = $scope.object;
		}
	};
});
/*Settings*/
app.service('SettingsService',function(){
	this.getTitle = function(){return "Settings"};
	this.getButtons = function(){
		return [
				{
					titel: 'Turn the clock on/off:',
					name: 'cSwitch',
					state: 'on',
					sFor: 'clock',
					sClass: 'none'
				},
				{
					titel: 'Maximize the windows:',
					name: 'mSwitch',
					state: 'off',
					sFor: '.content',
					sClass: 'maximized'
				}
			];
	};
});
/*Buttons*/
app.directive('sbutton',function(SettingsService){
	return{
		scope:{
			object: '=',
			view: '@'
		},
		template: `
			<h5>{{sbutton.titel}}</h5>
				<form class="switches">
					<div class="toggle {{sbutton.state}}">
						<label class="{{sbutton.state}}">{{sbutton.state}}</label>
						<input type="radio" name="toggle" value="off" ng-model="sbutton.state">
						<input type="radio" name="toggle" value="on" ng-model="sbutton.state">
						<span class="switch {{sbutton.state}}"></span>
					</div>
				</form>
		`,
		controller: function($scope) {
			$scope.sbutton = $scope.object;
			$scope.$watch('sbutton.state', function () {
				var sFor = $scope.sbutton.sFor;
				var sClass = $scope.sbutton.sClass;
				if ($scope.sbutton.name == "cSwitch" && $scope.sbutton.state == "off" || $scope.sbutton.name == "mSwitch" && $scope.sbutton.state == "on"){
					$(sFor).addClass(sClass)
				}else{
					$(sFor).removeClass(sClass);
				};
			});
		}
	};
});
/*Dragging
------------------*/
app.directive('ngDraggable', function($document){
return{
	restrict:'A',
	link: function(scope, elem) {
	var startX, startY, x = 0, y = 0, start, stop, drag;
	var container = document.querySelector("main").getBoundingClientRect();
	var width = elem[0].offsetWidth, height = elem[0].offsetHeight;
		elem.on('mousedown', function(e) {
			startX = e.clientX - elem[0].offsetLeft;
			startY = e.clientY - elem[0].offsetTop;
			$document.on('mousemove', mousemove);
			$document.on('mouseup', mouseup);
			if (start) start(e);
	});
	function mousemove(e) {
		y = e.clientY - startY;
		x = e.clientX - startX;
		setPosition();
		if (drag) drag(e);
	}
	function mouseup(e) {
		$document.unbind('mousemove', mousemove);
		$document.unbind('mouseup', mouseup);
		if (stop) stop(e);
	}
	function setPosition() {
		if (container) {
		container = document.querySelector("main").getBoundingClientRect();
		height = elem[0].offsetHeight;
		if (x < container.left) {
			x = container.left;
		} else if (x > container.right - width) {
			x = container.right - width;
		}
		if (y < container.top) {
			y = container.top;
		} else if (y > container.bottom - height) {
			y = container.bottom - height;
		}
	}
	elem.css({top:y+'px',left:x+'px'});
	}}};
});
/*Routing
------------------*/
app.config(function($routeProvider,$locationProvider){
	//$locationProvider.html5Mode(enabled:true,requireBase:false);
	$routeProvider
		.when('/avatar',{
		template: `
		<div id="avatar" class="content" ng-draggable>
			<header>
				<h2>{{titel}}</h2>
				<a class="fa fa-expand maximize" href="#maximized"></a>
				<a class="fa fa-compress minimize none" href="#minimized"></a>
				<a class="fa fa-times close" href="#"></a>
			</header>
					<!--<ul>
					<li class="skincolor white"></li><li class="skincolor brown"></li><li class="skincolor black"></li>
					ul>-->
			<div id="avatarcon">
				<div class="avatars" ng-repeat="avatars in avatar">
					<img ng-src="{{avatars.img}}" ng-click="changeAvatar(avatar);" class="{{avatars.class}} avatar" alt="{{avatars.name}}">
				</div>
			</div>
		</div>
		`,
		controller: function($scope, AvatarService){
			$scope.titel = AvatarService.getTitle();
			$scope.avatar = AvatarService.getAvatar();
			$scope.changeAvatar = function(avatar){
				var avatar = $(event.target);
				var thisAvatar = avatar.closest("img").attr("class").split(" ")[0];
				$(".avatars img").removeClass("currentAvatar");
				avatar.addClass("currentAvatar");
				$(".ava").removeClass("fa-user mwhsh mwhme mwhbe fwhsh fwhlo fwhpo").addClass(thisAvatar + " fa-blank");
			};
		}
		})
		.when('/questlogger',{
		template: `
		<div id="addlist" class="content" ng-draggable>
				<header>
					<h2>{{titel}}</h2>
					<a class="fa fa-expand maximize" href="#maximized"></a>
					<a class="fa fa-compress minimize none" href="#minimized"></a>
					<a class="fa fa-times close" href="#"></a>
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
		controller: function ($scope, TodoService) {
			$scope.saved = localStorage.getItem('todos');
			$scope.todos = (localStorage.getItem('todos')!==null) ? JSON.parse($scope.saved) : [];
			localStorage.setItem('todos', JSON.stringify($scope.todos));
			$scope.titel = TodoService.getTitle();
			$scope.markAll = false;
			//addToDo
			$scope.addTodo = function() {
				if($scope.todoText){
					$scope.todos.push({text:$scope.todoText, done:false});
					$scope.todoText = "";
					localStorage.setItem('todos', JSON.stringify($scope.todos));
				}
			};
			$scope.isTodo = function(){return $scope.todos.length > 0};
			//Toggle Edit Mode
			$scope.toggleEditMode = function(){
				$(event.target).closest('li').toggleClass('editing');
				localStorage.setItem('todos', JSON.stringify($scope.todos));
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
			$scope.hasDone = function(){return($scope.todos.length != $scope.remaining());};
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
		}
		})
		.when('/styles',{
		template: `
		<div id="styles" class="content theme" ng-draggable>
			<header>
				<h2>{{titel}}</h2>
				<a class="fa fa-expand maximize" href="#maximized"></a>
				<a class="fa fa-compress minimize none" href="#minimized"></a>
				<a class="fa fa-times close" href="#"></a>
			</header>
			<div ng-repeat="styles in style">
				<img ng-src="{{styles.img}}" ng-class="{currentTheme : $first}" ng-click="changeTheme($theme);" class="{{styles.class}}" alt="{{styles.name}}">
				<h5 class="themetitle">{{styles.name}}</h5>
			</div>
		</div>
		`,
		controller: function($scope, StyleService){
			$scope.titel = StyleService.getTitle();
			$scope.style = StyleService.getStyles();
			$scope.changeTheme = function(theme){
				var theme = $(event.target);
				var thisTheme = theme.closest("img").attr("class").split(" ")[0];
				$(".theme img").removeClass("currentTheme");
				theme.addClass("currentTheme");
				$("body").removeClass("theme1 theme2 theme3 theme4").addClass(thisTheme);
			};
		}
		})
		.when('/settings',{
		template: `
		<div id="settings" class="content" ng-draggable>
			<header>
				<h2>{{titel}}</h2>
				<a class="fa fa-expand maximize" href="#maximized"></a>
				<a class="fa fa-compress minimize none" href="#minimized"></a>
				<a class="fa fa-times close" href="#"></a>
			</header>
			<sbutton ng-repeat="sbutton in buttons" object="sbutton" view="small" id="{{sbutton.name}}"></sbutton>
		</div>
		`,
		controller: function ($scope, SettingsService){
			$scope.titel = SettingsService.getTitle();
			$scope.buttons = SettingsService.getButtons();
		}
		})
		.when('/about',{
		template: `
		<div id="about" class="content" ng-draggable>
			<header>
				<h2>{{titel}}</h2>
				<a class="fa fa-expand maximize" href="#maximized"></a>
				<a class="fa fa-compress minimize none" href="#minimized"></a>
				<a class="fa fa-times close" href="#"></a>
			</header>
			<p>Quest Logger is an Angular web-app that will help you organize all your quests!</p>
			<p>This application is created by:</p>
			<team ng-repeat="team in people" object="team" view="small"></team>
			<footer>Copyright &copy; {{cDate}} | Quest Logger</footer>
		</div>
		`,
		controller: function($scope, AboutService){
			$scope.titel = AboutService.getTitle();
			$scope.cDate = new Date().getFullYear();
			$scope.people = AboutService.getTeamMember();
		}
		})
		.otherwise({redirectTo:'/'});
});
/*Clock
------------------*/
app.directive('clock',function(){
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
/*Preload
------------------*/
function preload(arrayOfImages){$(arrayOfImages).each(function(){$('<img/>')[0].src = "images/" + this})}
preload([
	'team/rafael.jpg',
	'team/inias.jpg',
	'team/evelyne.jpg',
	'team/nico.jpg',
	'backgrounds/intoTheWoodsDay.png',
	'backgrounds/intoTheWoodsEvening.png',
	'backgrounds/intoTheWoodsNight.png',
	'backgrounds/RetrowaveDay.jpg',
	'backgrounds/RetrowaveEvening.jpg',
	'backgrounds/RetrowaveNight.jpg',
	'backgrounds/theCalmingBeachDay.png',
	'backgrounds/theHowlingDesertEvening.png',
	'backgrounds/theRagingHillsDay.png',
	'backgrounds/theRagingHillsEvening.png',
	'backgrounds/theRagingHillsNight.png',
	'backgrounds/theSilentMoonNight.png'
]);
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