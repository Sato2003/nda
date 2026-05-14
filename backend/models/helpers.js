const normalizeDoc = (doc) => {
  if (!doc) return null;
  const source = typeof doc.toObject === 'function' ? doc.toObject() : doc;
  const { _id, __v, ...rest } = source;
  return {
    id: String(_id),
    ...rest
  };
};

module.exports = {
  normalizeDoc
};
