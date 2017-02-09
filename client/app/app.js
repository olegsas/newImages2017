angular.module('app',['ngRoute'])

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
    .otherwise({redirectTo: '/login'});
    // $locationProvider.html5Mode(true);
})