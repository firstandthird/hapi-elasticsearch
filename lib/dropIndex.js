module.exports = function(opts) {
  const options = this.options;
  const client = this.client;
  const server = this.server;

  //opts: { index, type, id }
  opts.index = opts.index || options.index;
  if (options.log || !client) {
    server.log(['search', 'info'], {
      message: 'removing index',
      opts
    });
  }
  if (!client) {
    return;
  }
  return client.indices.delete(opts);
};
