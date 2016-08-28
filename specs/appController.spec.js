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
      WeatherService.get = sinon.stub();

      scope.itinerary.push('first-location');
      expect(scope.current()).to.equal('first-location');

      scope.itinerary.push('second-location');
      expect(scope.current()).to.equal('second-location');
    });

    it('should not show current location information when itinerary is empty', function() {
      scope.itinerary = [];
      expect(scope.hasLoadedItinerary()).to.equal(false);
    });

    it('should show current location information when itinerary is not empty', function() {
      scope.itinerary = ['some-location'];
      expect(scope.hasLoadedItinerary()).to.equal(true);
    });

    it('should have a readable last updated date', function () {
      var date = new Date();
      var lastYearDate = (date.getFullYear() - 1) + '/' + (date.getMonth() + 1) + '/' + date.getDate();

      scope.itinerary = [{ date: lastYearDate }];

      expect(scope.lastUpdatedDate()).to.equal('a year ago');
    });

    it('last updated date should be empty when there are no itinerary locations', function () {
      scope.itinerary = [];

      expect(scope.lastUpdatedDate()).to.be.empty;
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

    it('should show markers prior to selected date', function() {
      scope.timelineSelectedDate = 1;
      expect(scope.showMarkers(0)).to.equal(true);
      expect(scope.showMarkers(1)).to.equal(true);
      expect(scope.showMarkers(2)).to.equal(false);
    });
  });

  describe('route polyline', function() {
    it('should be an array of coordinates from itinerary', function() {
      scope.timelineSelectedDate = 2;

      scope.itinerary.push({ lat: 1, lng: 2});
      expect(scope.routePolylinePath()).to.deep.equal([[1,2]]);

      scope.itinerary.push({ lat: 3, lng: 4});
      expect(scope.routePolylinePath()).to.deep.equal([[1,2],[3,4]]);
    });

    it('should only display if prior to selected date', function() {
      scope.timelineSelectedDate = 1;

      scope.itinerary.push({ lat: 1, lng: 2});
      scope.itinerary.push({ lat: 3, lng: 4});
      scope.itinerary.push({ lat: 5, lng: 6});
      expect(scope.routePolylinePath()).to.deep.equal([[1,2],[3,4]]);
    });
  });

  describe('map info window', function() {
    it('should change window content', function() {
      scope.map = { showInfoWindow: sinon.spy() };

      scope.showInfo({}, 'some info window text');

      expect(scope.infoWindowContent).to.equal('some info window text');
      expect(scope.map.showInfoWindow.called).to.equal(true);
    });
  });

  describe('locations google spreadsheet', function() {
    it('should set itinerary contents from spreadsheet', function() {
      scope.readSpreadsheet([{ Lat: 1, Long: 2, Location: 'City', Country: 'Brazil', Date: '2016-01-01' }]);

      expect(scope.itinerary).to.deep.equal([{
        'lat': 1,
        'lng': 2,
        'latLng': '1,2',
        'description': 'City, Brazil',
        'date': '2016-01-01'
      }]);
    });

    it('should not include places in the future', function() {
      scope.readSpreadsheet([
        { Lat: 1, Long: 2, Location: 'City', Country: 'Brazil', Date: '2016-01-01' },
        { Lat: 1, Long: 2, Location: 'City', Country: 'Brazil', Date: '2100-01-01' },
      ]);

      expect(scope.itinerary).to.deep.equal([{
        'lat': 1,
        'lng': 2,
        'latLng': '1,2',
        'description': 'City, Brazil',
        'date': '2016-01-01'
      }]);
    });
  });

  describe('timeline', function() {
    beforeEach(function () {
      WeatherService.get = sinon.stub();

      scope.itinerary.push({ description: 'first-location', date: '2015-01-01' });
      scope.itinerary.push({ description: 'last-location', date: '2015-01-02' });
      scope.$apply();
    });

    it('should know what is the start date', function() {
      expect(scope.timeline.range.min).to.equal(0);
    });

    it('should know what is the end date', function() {
      expect(scope.timeline.range.max).to.equal(1);
    });
  });
});
