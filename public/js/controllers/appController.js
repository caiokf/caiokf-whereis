angular.module('whereIsCaioKF').
  
  controller('AppController', function ($scope) {

    $scope.itinerary = [
      'Goreme, Turkey',
      //'Goreme, Turkey',
      //'Antalya, Turkey',
      'Antalya, Turkey',
      'Pamukkale, Turkey',
      'Chios, Greece',
      'Athens, Greece',
      'Skala Oropou, Greece',
      //'Trikala, Greece',
      'Litochoro, Greece',
      'Giannitsa, Greece',
      //'Ulcinj, Montenegro',
      'Dubrovnik, Croatia',
      'Zoaric, Croatia',
      'Jezerce, Croatia',
      'Muggia, Italy',
      'Morter, Italy',
      //'Geneva, Switzerland',
      //'Geneva, Switzerland',
      //'Geneva, Switzerland',
      //'Geneva, Switzerland',
      // 'Geneva, Switzerland',
      // //'Lucerne, Switzerland',
      // 'Lucerne, Switzerland',
      // //'Baar, Zug, Switzerland',
      // 'Baar, Zug, Switzerland',
      // 'Reichenburg, Switzerland',
      // 'Farenstoggli, Switzerland',
      // 'Schwagalp, Switzerland',
      // 'Buhler, Switzerland',
      // 'Buhler, Switzerland',
      // 'Buhler, Switzerland',
      // 'Buhler, Switzerland',
      // 'Buhler, Switzerland',
      // 'Buhler, Switzerland',
      // 'Buhler, Switzerland',
      // 'Buhler, Switzerland',
      // 'Buhler, Switzerland',
      // 'Buhler, Switzerland',
      // 'Buhler, Switzerland',
      // 'Buhler, Switzerland',
      // 'Buhler, Switzerland',
      // 'Buhler, Switzerland',
      // 'Buhler, Switzerland',
      // 'Appenzell, Switzerland',
      // 'Buhler, Switzerland',
      // 'Buhler, Switzerland',
      // 'Buhler, Switzerland',
      // 'Buhler, Switzerland',
      // 'Buhler, Switzerland',
      // 'Buhler, Switzerland',
      // 'Buhler, Switzerland',
      // 'Buhler, Switzerland',
      // 'Zurich, Switzerland',
      // 'Zurich, Switzerland',
      // 'Zurich, Switzerland',
      // 'Porto Alegre, Brazil',
      // 'Porto Alegre, Brazil',
      // 'Porto Alegre, Brazil',
      // 'Porto Alegre, Brazil',
      // 'Porto Alegre, Brazil',
      // 'Porto Alegre, Brazil',
      // 'Porto Alegre, Brazil',
      // 'Porto Alegre, Brazil',
      // 'Porto Alegre, Brazil',
      // 'Porto Alegre, Brazil',
      // 'Canoas, Brazil',
      // 'Arroio do Sal, Rio Grande do Sul, Brazil',
      // 'Arroio do Sal, Rio Grande do Sul, Brazil',
      // 'Capao da Canoa, Brazil',
      // 'Porto Alegre, Brazil',
      // 'Porto Alegre, Brazil',
      // 'Porto Alegre, Brazil',
      // 'Porto Alegre, Brazil',
      // 'Porto Alegre, Brazil',
      // 'Porto Alegre, Brazil',
      // 'Porto Alegre, Brazil',
      // 'Porto Alegre, Brazil',
      // 'Porto Alegre, Brazil',
      // 'Porto Alegre, Brazil',
      // 'Porto Alegre, Brazil',
      // 'Porto Alegre, Brazil',
      // 'Montevideo, Uruguay',
      // 'Cardona, Soriano, Uruguay',
      // 'Cardona, Soriano, Uruguay',
      // 'Cardona, Soriano, Uruguay',
      // 'Cardona, Soriano, Uruguay',
      // 'Cardona, Soriano, Uruguay',
      // 'Montevideo, Uruguay',
      // 'Piriapolis, Uruguay',
      // 'Piriapolis, Uruguay',
      // 'Maldonado, Maldonado, Uruguay',
      // 'Maldonado, Maldonado, Uruguay',
      // 'Maldonado, Maldonado, Uruguay',
      // 'La Paloma, Uruguay',
      // 'La Paloma, Uruguay',
      // 'Barra de Valizas, Uruguay',
      // 'Barra de Valizas, Uruguay',
      // 'Punta del Diablo, Uruguay',
      // 'Punta del Diablo, Uruguay',
      // 'Fortaleza Santa Tereza, Uruguay',
      // 'Fortaleza Santa Tereza, Uruguay',
      // 'Fortaleza Santa Tereza, Uruguay',
      // 'Fortaleza Santa Tereza, Uruguay',
      // 'Porto Alegre, Brazil',
      // 'Porto Alegre, Brazil',
      // 'Porto Alegre, Brazil',
      // 'Arroio do Meio, RS, Brazil',
      // 'Porto Alegre, Brazil',
      // 'Porto Alegre, Brazil',
      // 'Porto Alegre, Brazil'
    ];
    $scope.cost = {
      amount: 0,
      currency: 'USD'
    };

    // $scope.$on('mapInitialized', function(event, map) {
    //   $scope.map = map;
    //   map.setZoom(2);
    //   // var markers = [];

    //   // for (var x = 0; x < $scope.itinerary.length; x++) {
    //   //   $.getJSON('http://maps.googleapis.com/maps/api/geocode/json?address='+$scope.itinerary[x]+'&sensor=false', null, function (data) {
    //   //       var p = data.results[0].geometry.location
    //   //       var latlng = new google.maps.LatLng(p.lat, p.lng);
    //   //       var marker = new google.maps.Marker({
    //   //           position: latlng, map: map
    //   //       });
    //   //       markers.push(marker);
    //   //   });
    //   // }
    // });
  });
