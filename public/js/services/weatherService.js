angular.module('whereIsCaioKF')
  .service('WeatherService', function($http, $q) {
    return {
      get: function(location, success) {
        var locationQuery = escape("select item from weather.forecast where woeid in (select woeid from geo.places(1) where text='" + location + "') and u='c'");
        var locationUrl = "https://query.yahooapis.com/v1/public/yql?q=" + locationQuery + "&format=json";

        var request = $http({
          method: "get",
          url: locationUrl,
        });

        return(request.then(
          function (response) { 
            return success(response.data); 
          }, 
          function (response) {
            console.log(response);
          }
        ));
      }
    };
  });