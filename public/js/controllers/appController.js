angular.module('whereIsCaioKF', ['ngMap']).
  
  controller('AppController', function ($scope, NgMap, WeatherService) {

    var publicSpreadsheetUrl = 'https://docs.google.com/spreadsheet/pub?hl=en_US&hl=en_US&key=1ujZWyJk4CftjJtZqPINWhbtKwCBR8QMQ2d3uMoK7zvU&output=html';

    $scope.itinerary = [];

    $scope.readSpreadsheet = function(data, tabletop) {
      $scope.itinerary = _.map(data, function(item) {
        return {
          'lat': item.Lat,
          'long': item.Long,
          'latLong': item.Lat + ',' + item.Long,
          'description': item.Location + ', ' + item.Country,
          'date': item.Date
        };
      })
    };

    Tabletop.init({ 
      key: publicSpreadsheetUrl,
      callback: $scope.readSpreadsheet,
      simpleSheet: true 
    });

    NgMap.getMap().then(function(map) {
      $scope.map = map;
    });

    $scope.showInfo = function(evt, text) {
      $scope.info = text;
      $scope.map.showInfoWindow('info', this);
    };

    $scope.$watch('itinerary', function (newValue, oldValue) {
      if (newValue.length > 0) {
        WeatherService.get(newValue[0].latLong, function(response) {
          $scope.weather = {
            temperature: response.main.temp,
            condition: response.weather[0].description,
            icon: response.weather[0].icon
          };
        });

        $scope.current = newValue[0];
      }
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