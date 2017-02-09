angular.module('app')

.controller('registrationCtrl',function($http,$scope,$location){
    $scope.registrate = function(user){
        $http.post('/registrate',user)
           .then(function(data){
               console.log(data.data.token)
               window.localStorage['jwt'] = angular.toJson(data.data.token);
                // $location.path('/login')  
            })
    }
})