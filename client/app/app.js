angular.module('app',['ngRoute','ngAnimate', 'ngSanitize', 'ui.bootstrap'])

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
    .when('/home', {
        templateUrl:'../templates/home.html',
        controller:'homeCtrl'
    })
    .otherwise({redirectTo: '/home'});
})