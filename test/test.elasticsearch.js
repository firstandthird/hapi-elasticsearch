const tap = require('tap');
const Hapi = require('hapi');
const plugin = require('../index.js');
const ES = require('elasticsearch-mock-js');

tap.test('can load plugin', async t => {
  await ES.start();
  const server = new Hapi.Server({ port: 8080 });
  server.register({
    plugin,
    options: {
      host: 'localhost:9200',
      elasticLog: 'debug',
    }
  });
  await new Promise(resolve => setTimeout(resolve, 2000));
  await server.start();
  await ES.stop();
  await server.stop();
  t.end();
});
