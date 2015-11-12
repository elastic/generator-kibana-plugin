var moment = require('moment');
require('plugins/<%= name %>/less/main.less');
require('ui/chrome').setNavBackground('#222222').setTabs([]);

var app = require('ui/modules').get('app/<%= name %>', []);

require('ui/routes')
  .when('/', {
    template: require('plugins/<%= name %>/templates/index.html'),
    resolve: {
      currentTime: function ($http) {
        return $http.get('/<%= name %>/api/example')
        .then(function (resp) {
          return resp.data.time;
        });
      }
    }
  });

app.controller('<%= camelCaseName %>HelloWorld', function ($scope, $route, $interval) {
  $scope.title = '<%= title %>';
  $scope.description = '<%= description %>';

  var currentTime = moment($route.current.locals.currentTime);
  $scope.currentTime = currentTime.format('HH:mm:ss');
  var unsubscribe = $interval(function () {
    $scope.currentTime = currentTime.add(1, 'second').format('HH:mm:ss');
  }, 1000);
  $scope.$watch('$destroy', unsubscribe);

});
