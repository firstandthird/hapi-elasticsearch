const tap = require('tap');
const Hapi = require('hapi');
const plugin = require('../index.js');

tap.test('can load plugin', async (t) => {
  const server = new Hapi.Server({ port: 8080 });
  await server.register({
    plugin,
    options: {
      host: 'localhost:9200',
      elasticLog: 'debug',
    }
  });
  await server.start();
  await new Promise(resolve => setTimeout(resolve, 2000));
  await server.stop();

  t.end();
});
