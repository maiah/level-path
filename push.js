var uuid = require('uuid');

function push(keyPath, obj) {
  var id = uuid.v4();

  var objs = [];
  var i = 0;
  for (var objKey in obj) {
    objs[i] = { type: 'put', key: keyPath + '/' + id + '/' + objKey, value: obj[objKey] };
    i++;
  }

  this.batch(objs, function (err) {});
}

module.exports = function (db) {
  db.push = push;
  return db;
};
