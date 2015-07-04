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

function isNumeric(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

export default {
  getProperties, isImmutable, isNumeric,
};
