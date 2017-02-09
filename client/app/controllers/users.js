angular.module('app')

.controller('usersCtrl',function($http,$scope,$location,$routeParams){

    $http.post('/getUsersList')
        
})