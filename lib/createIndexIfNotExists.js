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
    await server.search.createIndex({ index: opts.index, log: options.elasticLog });
  }
};
