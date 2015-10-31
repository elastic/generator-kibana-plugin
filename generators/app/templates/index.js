module.exports = function (kibana) {
  return new kibana.Plugin({
    name: '<%= name %>',

    uiExports: {
      app: {
        title: '<%= title %>',
        description: '<%= description %>',
        main: 'plugins/<%= name %>/<%= name %>',
        autoload: kibana.autoload.styles
      }
    },

    config: function (Joi) {
      return Joi.object({
        enabled: Joi.boolean().default(true),
      }).default();
    },

    init: function (server, options) {
      // Add server routes and initalize the plugin here
    }

  });
};

