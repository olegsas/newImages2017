angular.module('app',['ngRoute','ngFileUpload','ngAnimate', 'ngSanitize', 'ui.bootstrap'])

.config(function($routeProvider, $locationProvider){
    $routeProvider
    .when('/registrate', {
        templateUrl:'../templates/registration.html',
        controller:'registrationCtrl'
    })
    .when('/login', {
        templateUrl:'../templates/login.html',
        controller:'loginCtrl'
    })
    .when('/logout', {
        templateUrl:'../templates/login.html',
        controller:'logoutCtrl'
    })
    .when('/users', {
        templateUrl:'../templates/users.html',
        controller:'usersCtrl'
    })
    .when('/home', {
        templateUrl:'../templates/home.html',
        controller:'homeCtrl'
    })
    .when('/home/:userId', {
        templateUrl:'../templates/home.html',
        controller:'homeIdCtrl'
    })
    .otherwise({redirectTo: '/home'});
})

.controller('myCtrl',function($http,$scope,$location,$uibModal){
    
})