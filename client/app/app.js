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

.service('auth',function(){
    this.isLogin = false;
    this.login = function(){
         this.isLogin = true;
    }
    this.logout = function(){
        this.isLogin = false;
    }
   
})

.run(['$rootScope','$location','auth','$routeParams',
    function($rootScope,$location,auth,$routeParams){
        $rootScope.$on('$routeChangeStart',function(event, next, current){
        })
}])

.controller('myCtrl',function($http,$scope,$location,$uibModal,$rootScope,auth,$routeParams){

        $scope.$on('$routeChangeSuccess',function(event, previous, current){
            $scope.isLogin = auth.isLogin;
        })
})
    