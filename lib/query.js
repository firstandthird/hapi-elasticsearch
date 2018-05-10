module.exports = function(index, body, done) {
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
    return done(null, {});
  }
  client.search(searchQuery, (err, res) => {
    done(err, res);
  });
};
