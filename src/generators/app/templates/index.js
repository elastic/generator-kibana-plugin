<% if (generateApp) { %>import { resolve } from 'path';<% } %>
<% if (generateApi) { %>import exampleRoute from './server/routes/example';<% } %>

export default function (kibana) {
  return new kibana.Plugin({
    require: ['elasticsearch'],

    uiExports: {
      <% if (generateApp) { %>
      app: {
        title: '<%= title %>',
        description: '<%= description %>',
        main: 'plugins/<%= name %>/app'
      },
      translations: [
        resolve(__dirname, './translations/es.json')
      ],
      <% } %>
      <% if (generateHack) { %>
      hacks: [
        'plugins/<%= name %>/hack'
      ]
      <% } %>
    },

    config(Joi) {
      return Joi.object({
        enabled: Joi.boolean().default(true),
      }).default();
    },

    <% if (generateApi) { %>
    init(server, options) {
      // Add server routes and initalize the plugin here
      exampleRoute(server);
    }
    <% } %>

  });
};
