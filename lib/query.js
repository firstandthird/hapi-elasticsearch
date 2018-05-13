module.exports = function(index, body) {
  const options = this.options;
  const client = this.client;
  const server = this.server;

  const searchQuery = {
    index: index || options.mainIndex,
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
  return client.search(searchQuery;
};
