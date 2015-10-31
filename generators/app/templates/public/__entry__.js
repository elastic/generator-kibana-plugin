require('plugins/<%= name %>/less/main.less');
require('ui/chrome')
  .setNavBackground('#222222')
  .setTabDefaults({
    resetWhenActive: true,
    trackLastPath: true,
    activeIndicatorColor: '#EFF0F1'
  });

var mod = require('ui/modules').get('<%= camelCaseName %>', []);
var template = require('plugins/<%= name %>/templates/index.html');

mod.config(function ($routeProvider) {
  $routeProvider
    .when('/', {
      template: template
    });
});

mod.controller('<%= camelCaseName %>HelloWorld', function ($scope) {
  $scope.title = '<%= title %>';
  $scope.description = '<%= description %>';
});
