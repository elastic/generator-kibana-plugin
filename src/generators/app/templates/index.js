<% if (generateTranslations) { %>import { resolve } from 'path';<% } %>
<% if (generateApi) { %>import exampleRoute from './server/routes/example';<% } %>

import fs from 'fs';
import path from 'path';

function getAll(type) {
  try {
    return fs.readdirSync(path.join(__dirname, 'public', type)).map(file => {
      return `plugins/<%= name %>/${type}/${file.replace(/\.js$/, '')}`;
    });
  } catch (e) {
    return [];
  }
}

export default function (kibana) {
  return new kibana.Plugin({
    require: ['elasticsearch'],

    uiExports: {
      fieldFormats: getAll('field_formats'),
      <% if (generateApp) { %>
      app: {
        title: '<%= title %>',
        description: '<%= description %>',
        main: 'plugins/<%= name %>/app'
      },
      <% } %>
      <% if (generateTranslations) { %>
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
