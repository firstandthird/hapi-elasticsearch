module.exports = function(opts, done) {
  const options = this.options;
  const client = this.client;
  const server = this.server;

  //opts: { index, type, id }
  opts.index = opts.index || options.mainIndex;
  opts.body = {
    query: {
      match_all: {}
    }
  };

  if (options.log || !client) {
    server.log(['search', 'info'], {
      message: 'removing from index',
      opts
    });
  }
  if (!client) {
    return done();
  }
  client.deleteByQuery(opts, (err, res) => {
    //elastic search sends a 3rd param, so we have to break this out for auto to work correctly
    done(err, res);
  });
};
