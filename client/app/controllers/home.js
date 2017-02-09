angular.module('app')

.controller('homeCtrl',function($http,$scope,$location){
    let token = window.localStorage.getItem('jwt');
    if(token == null){
        $location.path('/login');
    }else{
    $http.post('/getCurrentUser')
        .then(function(data){
            $scope.username = data.data.username;
            $scope.profile = data.data.private;
            $scope.isAdmin = data.data.isAdmin;
        })
       
    $http.post('/getImagesCurrentUser')
        .then(function(data){
            $scope.images = data.data;
        })
    }
})