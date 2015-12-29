angular.module('whereIsCaioKF', ['ngMap']).
  
  controller('AppController', function ($scope, NgMap, WeatherService) {

    var publicSpreadsheetUrl = 'https://docs.google.com/spreadsheet/pub?hl=en_US&hl=en_US&key=1ujZWyJk4CftjJtZqPINWhbtKwCBR8QMQ2d3uMoK7zvU&output=html';

    $scope.itinerary = [];

    $scope.readSpreadsheet = function(data, tabletop) {
      $scope.itinerary = _.map(data, function(item) {
        return {
          'lat': item.Lat,
          'lng': item.Long,
          'latLng': item.Lat + ',' + item.Long,
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

    $scope.mapIcon = function(index) {
      if (index === $scope.itinerary.length - 1) {
        return 'https://maps.google.com/mapfiles/ms/icons/blue-dot.png';
      }

      return 'https://maps.google.com/mapfiles/ms/icons/red-dot.png'
    };

    $scope.showInfo = function(evt, text) {
      $scope.info = text;
      $scope.map.showInfoWindow('info', this);
    };

    $scope.showMarkers = function() {
      return true;
    };

    $scope.routePolylinePath = function () {
      return $scope.itinerary.map(function(location) {
        return [location.lat, location.lng];
      });
    };

    $scope.showCurrentLocationInfo = function() {
      return $scope.itinerary.length > 0;
    };

    $scope.$watch('itinerary', function (newValue, oldValue) {
      if (newValue.length > 0) {
        $scope.current = newValue[newValue.length - 1];

        WeatherService.get($scope.current.description, function(response) {
          $scope.weather = {
            temperature: response.query.results.channel.item.condition.temp,
            condition: response.query.results.channel.item.condition.text,
            code: response.query.results.channel.item.condition.code,
          };
        });
      }
    }, true);
  })

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
    }
  });