angular.module('whereIsCaioKF')

  .controller('AppController', function ($scope, NgMap, WeatherService, GoogleSpreadsheetService) {

    $scope.itinerary = [];
    
    var width = 960,
    height = 960;

    $scope.readSpreadsheet = function(data, tabletop) {
      $scope.itinerary = _.map(data, function(item) {
        return {
          'lat': item.Lat,
          'lng': item.Long,
          'latLng': item.Lat + ',' + item.Long,
          'description': item.Location + ', ' + item.Country,
          'date': item.Date
        };
      });

      var arc = d3.geo.greatArc()
        .source(function(d) { return [d.source.lat, d.source.lng]; })
        .target(function(d) { return [d.target.lat, d.target.lng]; });

      var projection = d3.geo.mercator()
        .scale((width + 1) / 2 / Math.PI)
        .translate([width / 2, height / 2])
        .precision(.1);

      var path = d3.geo.path()
          .projection(projection);

      var graticule = d3.geo.graticule();

      var radius = d3.scale.sqrt()
        .domain([0, 1e6])
        .range([0, 15]);

      var svg = d3.select("#itinerary-map").append("svg")
          .attr("width", width)
          .attr("height", height);

      svg.append("path")
          .datum(graticule)
          .attr("class", "graticule")
          .attr("d", path);

      d3.json("/js/lib/world.json", function(error, world) {
        
        svg.insert("path", ".graticule")
          .datum(topojson.feature(world, world.objects.land))
          .attr("class", "land")
          .attr("d", path);

        svg.insert("path", ".graticule")
          .datum(topojson.mesh(world, world.objects.countries, function(a, b) { return a !== b; }))
          .attr("class", "boundary")
          .attr("d", path);

        svg.selectAll(".pin")
          .data($scope.itinerary)
        .enter().append("circle", ".pin")
          .attr("r", 10)
          .attr("transform", function(d) {
            return "translate(" + projection([d.lng, d.lat]) + ")";
          });

        svg.selectAll("path.arc")
          .data([
            { source: { lat: 50.123, lng: 0.7892 }, target: { lat: 0.1230, lng: 50.792 } } 
          ])
        .enter().append("svg:path")
          .attr("class", "arc")
          .attr("d", function(d) { return path(arc(d)); });
        });
    };

    GoogleSpreadsheetService.get($scope.readSpreadsheet);

    $scope.routePolylinePath = function () {
      return $scope.itinerary.map(function(location) {
        return [location.lat, location.lng];
      });
    };

    $scope.showCurrentLocationInfo = function() {
      return $scope.itinerary.length > 0;
    };

    $scope.lastUpdatedDate = function() {
      if ($scope.itinerary.length > 0) {
        return moment($scope.current().date, 'DD/MM/YYYY').fromNow();
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
      }
    }, true);
  });