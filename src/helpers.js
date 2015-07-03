function getProperties(obj) {
  let lst = [];
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      lst.push(key);
    }
  }
  return lst;
}

function isImmutable(data) {
  return data === undefined ||
         data === null ||
         typeof data == "string" ||
         typeof data == "number";
}

export default {
  getProperties, isImmutable,
};
