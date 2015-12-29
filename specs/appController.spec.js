describe('App Controller', function() {
  var scope, controller, WeatherService;

  beforeEach(function() {
    module('whereIsCaioKF');

    inject(function($rootScope, $controller, _WeatherService_) {
      scope = $rootScope.$new();
      WeatherService = _WeatherService_;
      controller = $controller('AppController', {'$scope': scope, 'WeatherService': WeatherService });
    });
  });

  it('should start with an empty itinerary list', function() {
    expect(scope.itinerary.length).to.equal(0);
  });

  describe('current location', function() {
    it('should be last item on itinerary', function() {
      WeatherService.get = function() {};

      scope.itinerary.push('first-location');
      scope.$apply();
      expect(scope.current).to.equal('first-location');

      scope.itinerary.push('second-location');
      scope.$apply();
      expect(scope.current).to.equal('second-location');
    });

    it('should not show current location information when itinerary is empty', function() {
      scope.itinerary = [];
      expect(scope.showCurrentLocationInfo()).to.equal(false);
    });

    it('should show current location information when itinerary is not empty', function() {
      scope.itinerary = ['some-location'];
      expect(scope.showCurrentLocationInfo()).to.equal(true);
    });
  });

  describe('map markers', function() {
    beforeEach(function() {
      scope.itinerary = ['should-have-red-marker', 'should-have-red-marker', 'last-item-should-have-blue-marker'];
    });

    it('should have red icon for all locations except last', function() {
      expect(scope.mapIcon(0)).to.contain('red-dot');
      expect(scope.mapIcon(1)).to.contain('red-dot');
    });

    it('should have blue icon for last location', function() {
      expect(scope.mapIcon(2)).to.contain('blue-dot');
    });

    it('should always show markers', function() {
      expect(scope.showMarkers()).to.equal(true);
    });
  });
});