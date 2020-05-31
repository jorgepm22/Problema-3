async function homeController($scope, storage, homeService) {
    
    $scope.homeService = homeService;
    $scope.storage = storage;

    
    $scope.close_sesion = () => {
      $scope.storage.resetSessionToken();
      $scope.$emit("closeSesion");
    };
      
    const sessionToken = await storage.getSessionToken()
    homeService.getList(sessionToken).then((res) => {

        $scope.file = res;
        console.log($scope.file)
        $scope.current_grid = 1;
        $scope.data_limit = 10;
        $scope.filter_data = $scope.file.length;
        $scope.entire_user = $scope.file.length;
        $scope.$apply()
    });
    
    $scope.page_position = (page_number) => {
        $scope.current_grid = page_number;
    };
    
    $scope.sort_with = (base) => {
        $scope.base = base;
        $scope.reverse = !$scope.reverse;
    };

    

  }
  
  
  angular.module('app').component('home', {
    templateUrl: 'home/home.html',
    controller: ['$scope',"storage","homeService", homeController]
  })
  