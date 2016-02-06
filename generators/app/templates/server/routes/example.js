export default function (server) {

  server.route({
    path: '/<%= name %>/api/example',
    method: 'GET',
    handler(req, reply) {
      reply({ time: (new Date()).toISOString() });
    }
  });

};
