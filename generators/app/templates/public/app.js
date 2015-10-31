require('plugins/<%= name %>/less/main.less');
require('ui/chrome').setNavBackground('#222222').setTabs([]);

var app = require('ui/modules').get('app/<%= name %>', []);

require('ui/routes')
  .when('/', {
    template: require('plugins/<%= name %>/templates/index.html'),
  });

app.controller('<%= camelCaseName %>HelloWorld', function ($scope) {
  $scope.title = '<%= title %>';
  $scope.description = '<%= description %>';
});
