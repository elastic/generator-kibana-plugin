import exampleRoute from './server/routes/example';
import pkg from './package.json';

export default function (kibana) {
  return new kibana.Plugin({
    id: pkg.name,
    require: ['kibana', 'elasticsearch'],

    ui: {
      app: {
        title: '<%= title %>',
        description: '<%= description %>',
        main: './app'
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
