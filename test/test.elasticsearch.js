const tap = require('tap');
const Hapi = require('hapi');
const plugin = require('../index.js');
const ES = require('elasticsearch-mock-js');

tap.test('can load plugin', async t => {
  ES.start(async (err) => {
    const server = new Hapi.Server({ port: 8080 });
    server.register({
      plugin,
      options: {
        host: 'localhost:9200',
        elasticLog: 'debug',
      }
    });
    await server.start();
    await new Promise(resolve => setTimeout(resolve, 2000));
    ES.stop(async (err) => {
      await server.stop();
      t.end();
    });
  });
});
