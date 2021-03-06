angular.module('whereIsCaioKF')
  .service('GoogleSpreadsheetService', function($http, $q) {
    var publicSpreadsheetUrl = 'https://docs.google.com/spreadsheet/pub?hl=en_US&hl=en_US&key=1ujZWyJk4CftjJtZqPINWhbtKwCBR8QMQ2d3uMoK7zvU&output=html';

    return {
      get: function() {
        var deferred = $q.defer();

        var callback = (data) => {
          deferred.resolve(data);
        };

        Tabletop.init({
          key: publicSpreadsheetUrl,
          callback: callback,
          simpleSheet: true
        });

        return deferred.promise;
      }
    };
  });
