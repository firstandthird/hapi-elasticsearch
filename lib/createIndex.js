module.exports = function(opts) {
  const options = this.options;
  const client = this.client;
  const server = this.server;

  opts.index = opts.index || options.index;
  const log = opts.log || options.log;

  if (log || !client) {
    server.log(['search', 'info'], {
      message: 'creating index',
      opts
    });
  }
  if (!client) {
    return;
  }
  delete opts.log;

  return client.indices.create(opts);
};
