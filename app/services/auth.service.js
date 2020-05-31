function authService($http) {
  return {

    login: async (user) => {
      var headers = {
        headers: {
          app: 'APP_BCK',
          password: user.password
        }
      };
      
      let url = 'https://dev.tuten.cl/TutenREST/rest/user/'+ user.email
      return await new Promise(function(resolve, reject)  { 
      $http.put( url
        , null, headers).then( function (response){
          resolve(response.data.sessionTokenBck)
        }.bind(this)).catch((error) => {
            reject(error.status)      
        });
      }.bind(this))
    }

  };

}

angular.module('app').service('auth', ['$http', authService]);
