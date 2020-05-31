

function loginController($scope , authService, storage) {

    $scope.failedLastAttempt = false;
    $scope.requestAwait = false;
    $scope.email = '';
    $scope.password = '';
    $scope.authService = authService;
    $scope.storage = storage;
  
    $scope.loginRequest = async () => {
      $scope.requestAwait = true;
      $scope.failedLastAttempt = false;
      let user= {
        email: $scope.email,
        password: $scope.password
      }
      await $scope.authService.login(user).then((token)=>{
        $scope.storage.setSessionToken(token)
        $scope.$emit('loginSuccess');
      }).catch((error) => {
        if (error) {
          if (error==400)
            $scope.$apply(() => {
              $scope.failedLastAttempt = true;
            });
          else
            alert("Hay un problema con el servidor, intente mas tarde")
        }
      });

      $scope.$apply(function () {
        $scope.requestAwait = false;
      });
      
    };
  
    $scope.onChange = () => {
      $scope.failedLastAttempt = false;
    };

  
  }

angular.module('app').component("login",{
    templateUrl: 'login/login.html',
    controller: ["$scope","auth","storage", loginController]
})