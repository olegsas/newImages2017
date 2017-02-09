angular.module('app')

.controller('loginCtrl',function($http,$scope,$location){
   
    $scope.login = function(user){
        $http.post('/login',user)
            
    }
})