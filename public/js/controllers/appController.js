angular.module('whereIsCaioKF', ['ngMap']).
  
  controller('AppController', function ($scope, NgMap) {

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
  });
