module.exports = async function(obj) {
  const options = this.options;
  const client = this.client;
  const server = this.server;
  //obj: { index, type, data }

  const id = obj.id || obj.data._id;
  const data = {
    index: obj.index || options.index,
    type: obj.type || options.type,
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
    return;
  }
  await server.search.createIndexIfNotExists({ index: obj.index });
  return client.index(data);
};
