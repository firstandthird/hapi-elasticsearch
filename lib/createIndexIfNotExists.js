module.exports = async function(opts) {
  const options = this.options;
  const client = this.client;
  const server = this.server;

  //obj: { index }
  opts.index = opts.index;

  if (!client) {
    return;
  }
  const indexExists = await client.indices.exists({ index: opts.index });
  if (!indexExists) {
    if (options.log || !client) {
      server.log(['search', 'info'], {
        message: 'creating index',
        opts
      });
    }
    const params = { index: opts.index, log: options.elasticLog };
    if (opts.settings) {
      params.body = opts.settings;
    }
    await server.search.createIndex(params);
  }
};
