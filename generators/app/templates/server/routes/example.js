module.exports = function (server) {

  server.route({
    path: '/api/<%= name %>/example',
    method: 'GET',
    handler: function (req, reply) {
      reply({ time: (new Date()).toISOString() });
    }
  });

};
