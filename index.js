const elasticsearch = require('elasticsearch');

const defaults = {
  apiVersion: '6.0',
  type: '_doc'
};

const register = function(server, pluginOptions) {
  let client = null;
  const options = Object.assign({}, defaults, pluginOptions);
  if (options.host) {
    client = new elasticsearch.Client({
      host: options.host,
      log: options.elasticLog,
      apiVersion: '6.0'
    });
  }

  const bind = {
    server,
    options,
    client
  };

  const methods = {
    addToIndex: require('./lib/add.js').bind(bind),
    removeFromIndex: require('./lib/remove.js').bind(bind),
    clearByType: require('./lib/clearByType.js').bind(bind),
    query: require('./lib/query.js').bind(bind),
    dropIndex: require('./lib/dropIndex.js').bind(bind),
    createIndex: require('./lib/createIndex.js').bind(bind),
    createIndexIfNotExists: require('./lib/createIndexIfNotExists.js').bind(bind),
    client
  };

  server.decorate('server', 'search', methods);
};

exports.plugin = {
  register,
  once: true,
  name: 'search'
};
