module.exports = function (server) {

  server.route({
    path: '/<%= name %>/api/example',
    method: 'GET',
    handler: function (req, reply) {
      reply({ time: (new Date()).toISOString() });
    }
  });

};
