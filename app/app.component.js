var app = angular.module("app", ['ui.bootstrap'])


function routingController($scope){
    this.$onInit = () => {
        $scope.isLogged = false;
    }
    
    $scope.$on('loginSuccess', () => {
        $scope.$apply(() => {
            $scope.isLogged = true;
        })
    });

    $scope.$on('closeSesion', () => {        
        $scope.isLogged = false;   
    });
}

app.component("root",{
    templateUrl: 'app.routing.html',
    controller: ["$scope", routingController]
})