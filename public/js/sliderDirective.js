angular.module('whereIsCaioKF')

  .directive('slider', function() {
    return {
      restrict: 'E',
      template: '<div class="slider" />',
      replace: true,
      scope: {
        start: "@start",
        max: "@max",
        min: "@min",
        ngModel: '='
      },

      link: function (scope, element, attr, controller) {
        var slider = element[0];

        noUiSlider.create(slider, {
          start: [ scope.$eval(scope.start) ],
          step: 1,
          range: {
            'min': [ scope.$eval(scope.min) ],
            'max': [ scope.$eval(scope.max) ]
          }
        });

        scope.$watch('max', function (newValue, oldValue) { 
          slider.noUiSlider.updateOptions({
            start: scope.$eval(scope.max),
            range: {
              'min': scope.$eval(scope.min),
              'max': scope.$eval(scope.max)
            }
          });
          slider.noUiSlider.set(scope.$eval(scope.max));
        });

        slider.noUiSlider.on('update', function(values, handle) {
          var value = values[handle];
          if (handle) {
            scope.ngModel = value;
          } else {
            scope.ngModel = Math.round(value);
          }
          setTimeout(function(){ scope.$apply(); });
        });
      }
    }
  });