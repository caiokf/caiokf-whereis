angular.module('whereIsCaioKF')

  .controller('AppController', function ($scope, NgMap, WeatherService, GoogleSpreadsheetService) {

    $scope.itinerary = [];
    $scope.timeline = { range: { min: 0, max: 0 } };
    $scope.timelineSelectedDate = 0;

    $scope.readSpreadsheet = function(data, tabletop) {
      var itinerary = _.map(data, function(item) {
        return {
          'lat': item.Lat,
          'lng': item.Long,
          'latLng': item.Lat + ',' + item.Long,
          'description': item.Location + ', ' + item.Country,
          'date': item.Date
        };
      });

      itinerary = _.filter(itinerary, function(item) {
        return new Date(item.date) <= Date.now();
      });

      $scope.itinerary = itinerary;
    };

    GoogleSpreadsheetService.get($scope.readSpreadsheet);
    
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
      $scope.infoWindowContent = text;
      $scope.map.showInfoWindow('info', this);
    };

    $scope.showMarkers = function(index) {
      return (index <= $scope.timelineSelectedDate);
    };

    $scope.routePolylinePath = function () {
      return $scope.itinerary.map(function(location) {
        return [location.lat, location.lng];
      }).filter(function(location, index) {
        return index <= $scope.timelineSelectedDate;
      });
    };

    $scope.hasLoadedItinerary = function() {
      return $scope.itinerary.length > 0;
    };

    $scope.lastUpdatedDate = function() {
      if ($scope.itinerary.length > 0) {
        return moment($scope.current().date, 'YYYY-MM-DD').fromNow();
      }
      
      return '';
    };

    $scope.current = function () {
      if ($scope.itinerary.length > 0) {
        return $scope.itinerary[$scope.itinerary.length - 1];
      }
      return undefined;
    };

    $scope.$watch('itinerary', function (newValue, oldValue) {
      if (newValue.length > 0) {
        WeatherService.get($scope.current().description, function(response) {
          $scope.weather = {
            temperature: response.query.results.channel.item.condition.temp,
            condition: response.query.results.channel.item.condition.text,
            code: response.query.results.channel.item.condition.code,
          };
        });

        $scope.timeline.range = { min: 0, max: $scope.itinerary.length - 1 };
      }
    }, true);
  });