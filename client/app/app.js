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

// .factory('auth',function(){
//     let login={};

//     login.isLogin = function(){
//         let token = window.localStorage.getItem('jwt');
//         if(token){
//             return true;
//         }else{
//             return false;
//         }
//     }
//     return login;
// })

.service('auth',function(){
    this.isLogin = false;
    this.login = function(){
        //  this.isLogin = true;
        //  console.log(this.isLogin)
        return true;
    }
    this.logout = function(){
        // this.isLogin = false;
        //  console.log(this.isLogin)
        return false;
    }
   
})


.controller('myCtrl',function($http,$scope,$location,$uibModal,$rootScope,auth){
    
    $scope.isLogin = auth.login();

   
    // $scope.$watch('auth.isLogin',function(newValue, oldValue){
    //     $scope.isLogin = newValue;
    // },true)
    
    
    
    

    console.log($scope.isLogin)
    
})