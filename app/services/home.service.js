function toReservations(rawReservations) {
  return rawReservations.map(function (rawRes) {
    return {
      bookingId: rawRes.bookingId,
      client: rawRes.tutenUserClient.firstName
        + ' ' + rawRes.tutenUserClient.lastName,
      bookingTime: rawRes.bookingTime != undefined
        ? new Date(rawRes.bookingTime).toLocaleString()
        : undefined,
      streetAddress: rawRes.locationId.streetAddress,
      bookingPrice: rawRes.bookingPrice
    }
  });  
}

function homeService($http) {

  return {

    getList: function (sessionToken) {
      var headers = {
        headers: {
          adminemail: 'testapis@tuten.cl',
          app: 'APP_BCK',
          token: sessionToken
        }
      };
      let url = $http.get('https://dev.tuten.cl/TutenREST/rest/user/contacto%40tuten.cl/bookings?current=true', headers);
      return new Promise(function (resolve) {
        url.then(function (response) {
          resolve(toReservations(response.data));
        });
      });
    },

  };

}

angular.module('app').service('homeService', ['$http', homeService]);
