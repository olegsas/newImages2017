angular.module('app')

.controller('homeIdCtrl',function($http,$scope,$location,$routeParams,Upload,$timeout){
    let token = window.localStorage.getItem('jwt');
    if(token == null){
        $location.path('/login');
    }else{
        let userId = $routeParams;
    $http.post('/getCurrentUser',userId)
        .then(function(data){
            $scope.currentUser = data.data;
        })
       .then(function(){
           $http.post('/getImagesCurrentUser',$scope.currentUser)
            .then(function(data){
                $scope.images = data.data;
            })
       })

    $scope.uploadFiles = function(files, errFiles) {
        $scope.files = files;
        $scope.errFiles = errFiles;
        angular.forEach(files, function(file) {
            file.upload = Upload.upload({
                url: '/upload',
                data: {image: file}
            });
            
            file.upload.then(function (response) {
                $timeout(function () {
                    file.result = response.data;
                    $scope.images.push({url:response.data.url,public_id:response.data.public_id});
                });
            }, function (response) {
                if (response.status > 0)
                    $scope.errorMsg = response.status + ': ' + response.data;
            }, function (evt) {
                file.progress = Math.min(100, parseInt(100.0 *evt.loaded / evt.total));
            });
        });
    }; 

      $scope.deleteImage = function($index){
        $http.delete('/home/image/'+$scope.images[$index].id)
            .success(function(){
                 $scope.images.splice($index,1)
            })
      };

        $scope.changeProfile = function(){
            $http.post('/updateUser',$scope.currentUser)
        };
    }
})