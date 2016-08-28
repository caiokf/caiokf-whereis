angular.module('whereIsCaioKF')

  .controller('AppController', function ($scope, NgMap, WeatherService, GoogleSpreadsheetService) {
    $scope.readSpreadsheet = readSpreadsheet;
    $scope.mapIcon = mapIcon;
    $scope.showInfo = showInfo;
    $scope.showMarkers = showMarkers;
    $scope.routePolylinePath = routePolylinePath;
    $scope.hasLoadedItinerary = hasLoadedItinerary
    $scope.lastUpdatedDate = lastUpdatedDate;
    $scope.current = current;

    (function activate() {
      $scope.itinerary = [];
      $scope.timeline = { range: { min: 0, max: 1 } };
      $scope.timelineSelectedDate = 0;

      GoogleSpreadsheetService
        .get()
        .then((data) => $scope.readSpreadsheet(data))
        .then((data) => NgMap.getMap())
        .then((map) => $scope.map = map);

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
    }());

    function readSpreadsheet(data) {
      var itinerary = _.map(data, (x) => {
        return {
          'lat': x.Lat,
          'lng': x.Long,
          'latLng': x.Lat + ',' + x.Long,
          'description': x.Location + ', ' + x.Country,
          'date': x.Date
        };
      });

      itinerary = _.filter(itinerary, function(item) {
        return new Date(item.date) <= Date.now();
      });

      $scope.itinerary = itinerary;
    };

    function mapIcon(index) {
      if (index === $scope.itinerary.length - 1) {
        return 'https://maps.google.com/mapfiles/ms/icons/blue-dot.png';
      }

      return 'https://maps.google.com/mapfiles/ms/icons/red-dot.png'
    };

    function showInfo(evt, text) {
      $scope.infoWindowContent = text;
      $scope.map.showInfoWindow('info', this);
    };

    function showMarkers(index) {
      return (index <= $scope.timelineSelectedDate);
    };

    function routePolylinePath() {
      return _.chain($scope.itinerary)
        .map((location) => [location.lat, location.lng])
        .filter((location, i) => i <= $scope.timelineSelectedDate)
        .value();
    };

    function hasLoadedItinerary() {
      return $scope.itinerary.length > 0;
    };

    function lastUpdatedDate() {
      if ($scope.itinerary.length > 0) {
        return moment($scope.current().date, 'YYYY-MM-DD').fromNow();
      }

      return '';
    };

    function current() {
      if ($scope.itinerary.length > 0) {
        return $scope.itinerary[$scope.itinerary.length - 1];
      }
      return undefined;
    };
  });
