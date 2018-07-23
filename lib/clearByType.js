module.exports = function(opts, query) {
  const options = this.options;
  const client = this.client;
  const server = this.server;

  if (!query) {
    query = { match_all: {} };
  }

  //opts: { index, type, id }
  opts.index = opts.index || options.index;
  opts.body = {
    query
  };

  if (options.log || !client) {
    server.log(['search', 'info'], {
      message: 'removing from index',
      opts
    });
  }
  if (!client) {
    return;
  }
  return client.deleteByQuery(opts);
};
