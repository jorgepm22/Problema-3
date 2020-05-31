function mapper(rawReservations) {
  return rawReservations.map(function (Res) {
    return {
      bookingId: Res.bookingId,

      client: Res.tutenUserClient.firstName
        + ' ' + Res.tutenUserClient.lastName,

      bookingTime: Res.bookingTime != undefined
        ? new Date(Res.bookingTime).toLocaleString()
        : undefined,

      streetAddress: Res.locationId.streetAddress,

      bookingPrice: Res.bookingPrice
    }
  });  
}

function homeService($http) {

  return {

    getList: (sessionToken) => {
      var headers = {
        headers: {
          adminemail: 'testapis@tuten.cl',
          app: 'APP_BCK',
          token: sessionToken
        }
      };
      let url = $http.get('https://dev.tuten.cl/TutenREST/rest/user/contacto%40tuten.cl/bookings?current=true', headers);
      return new Promise( (resolve) => {
        url.then( (response) => {
          resolve(mapper(response.data));
        });
      });
    },

  };

}

angular.module('app').service('homeService', ['$http', homeService]);
