import exampleRoute from './server/routes/example';
import pkg from './package.json';

export default function (kibana) {
  return new kibana.Plugin({
    require: ['kibana', 'elasticsearch'],

    uiExports: {
      app: {
        title: '<%= title %>',
        description: '<%= description %>',
        main: 'plugins/<%= name %>/app'
      }
    },

    config(Joi) {
      return Joi.object({
        enabled: Joi.boolean().default(true),
      }).default();
    },

    init(server, options) {
      // Add server routes and initalize the plugin here
      exampleRoute(server);
    }

  });
};
