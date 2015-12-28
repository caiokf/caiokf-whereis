angular.module('whereIsCaioKF', ['ngMap']).
  
  controller('AppController', function ($scope, NgMap, WeatherService) {

    NgMap.getMap().then(function(map) {
      $scope.map = map;
    });

    $scope.showInfo = function(evt, text) {
      $scope.info = text;
      $scope.map.showInfoWindow('info', this);
    };

    $scope.itinerary = [
      {latLong: '-30.0331, -51.2300', description: 'Porto Alegre, Brazil'},
      {latLong: '46.2000, 6.1500', description: 'Geneva, Switzerland'},
      {latLong: '38.6431, 34.8289', description: 'Goreme, Turkey'},
    ];

    $scope.current = $scope.itinerary[0];

    WeatherService.get($scope.itinerary[0].latLong, function(response) {
      $scope.weather = {
        temperature: response.main.temp,
        condition: response.weather[0].description,
        icon: response.weather[0].icon
      };
    });
  })

  .service('WeatherService', function($http, $q) {
    return {
      get: function(location, success) {
        var request = $http({
          method: "get",
          url: "http://api.openweathermap.org/data/2.5/weather?units=metric&lat=-30.0331&lon=-51.2300&APPID=109b44c8463191b5251c660e9b61a47b",
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
    }
  });