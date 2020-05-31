function generateService($window) {

    var storageKey = 'sessionToken';
  
    return {
  
      getSessionToken: async() => {
        return await new Promise((resolve) => {
          var token = $window.localStorage.getItem(storageKey);
          if (token != null) {
            resolve(token);
          }
        });
      },
  
      resetSessionToken: () => {
        $window.localStorage.removeItem(storageKey);
      },
  
      setSessionToken: (sessionToken) => {
        $window.localStorage.setItem(storageKey, sessionToken);
      }
  
    };
  
  }
  
  angular.module('app').service('storage', ['$window', generateService]);