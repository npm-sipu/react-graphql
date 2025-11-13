export const transformId = (doc: any) => {
  if (!doc) return doc;
  const id = doc._id ? doc._id.toString() : undefined;
  const { _id, ...rest } = doc;
  return { id, ...rest };
};
