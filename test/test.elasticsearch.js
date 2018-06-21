const tap = require('tap');
const Hapi = require('hapi');
const plugin = require('../index.js');

tap.test('can load plugin', async (t) => {
  const server = new Hapi.Server({ port: 8080 });
  const host = process.env.ELASTICSEARCH_HOST;
  const rando = Math.floor(Math.random() * 1000);
  await server.register({
    plugin,
    options: {
      host: `${host}:9200`,
      elasticLog: 'debug',
      index: `othertestindx_${rando}`
    }
  });
  await server.start();

  await server.search.addToIndex({ index: 'testinx', type: 'doc', id: Math.floor(Math.random() * 10000), data: { tree: 'bones', gone: 'wind' } });
  await server.search.addToIndex({ type: 'doc', id: Math.floor(Math.random() * 10000), data: { tree: 'leafs', gone: 'fork' } });


  await new Promise(resolve => setTimeout(resolve, 2000));
  await server.stop();

  t.end();
});

tap.test('autocreate index with settings', async (t) => {
  const server = new Hapi.Server({ port: 8080 });
  const host = process.env.ELASTICSEARCH_HOST;
  const rando = Math.floor(Math.random() * 1000);
  await server.register({
    plugin,
    options: {
      host: `${host}:9200`,
      elasticLog: 'debug',
      index: `settingsindex_${rando}`,
      indexSettings: {
        settings: {
          index: {
            number_of_replicas: 2
          }
        }
      }
    }
  });
  await server.start();

  await server.search.addToIndex({ type: 'doc', id: Math.floor(Math.random() * 10000), data: { tree: 'leafs', gone: 'fork' } });

  await new Promise(resolve => setTimeout(resolve, 2000));
  await server.stop();

  t.end();
});
