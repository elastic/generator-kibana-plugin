import moment from 'moment';
import chrome from 'ui/chrome';
import uiModules from 'ui/modules';
import uiRoutes from 'ui/routes';

import 'ui/autoload/styles';
import 'plugins/<%= name %>/less/main.less';

chrome
  .setNavBackground('#222222')
  .setTabs([]);

uiRoutes.enable();
uiRoutes
.when('/', {
  template: require('plugins/<%= name %>/templates/index.html'),
  resolve: {
    currentTime($http) {
      return $http.get('../<%= name %>/api/example').then(function (resp) {
        return resp.data.time;
      });
    }
  }
});

uiModules
.get('app/<%= name %>', [])
.controller('<%= camelCaseName %>HelloWorld', function ($scope, $route, $interval) {
  $scope.title = '<%= title %>';
  $scope.description = '<%= description %>';

  var currentTime = moment($route.current.locals.currentTime);
  $scope.currentTime = currentTime.format('HH:mm:ss');
  var unsubscribe = $interval(function () {
    $scope.currentTime = currentTime.add(1, 'second').format('HH:mm:ss');
  }, 1000);
  $scope.$watch('$destroy', unsubscribe);
});
