module.exports = function(obj, done) {
  const options = this.options;
  const client = this.client;
  const server = this.server;
  //obj: { index, type, data }

  const id = obj.id || obj.data._id;
  const data = {
    index: obj.index || options.mainIndex,
    type: obj.type,
    id: id.toString(),
    body: obj.data
  };

  if (options.log || !client) {
    server.log(['search', 'info'], {
      message: 'adding to index',
      type: data.type,
      id: data.id,
      index: data.index
    });
  }
  if (!client) {
    return done();
  }
  client.index(data, done);
};