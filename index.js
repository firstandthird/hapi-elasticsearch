const elasticsearch = require('elasticsearch');

const defaults = {
  apiVersion: '6.0'
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
    addToIndex: require('./methods/add').bind(bind),
    removeFromIndex: require('./methods/remove').bind(bind),
    clearByType: require('./methods/clearByType').bind(bind),
    query: require('./methods/query').bind(bind)
  };

  server.decorate('server', 'search', methods);
};

exports.plugin = {
  register,
  once: true,
  name: 'search'
};
