module.exports = function(body, index, type) {
  const options = this.options;
  const client = this.client;
  const server = this.server;

  const searchQuery = {
    index: index || options.index,
    type: type || options.type,
    body
  };
  if (options.log || !client) {
    server.log(['search', 'info'], {
      message: 'search',
      searchQuery
    });
  }
  if (!client) {
    return {};
  }
  return client.search(searchQuery);
};
