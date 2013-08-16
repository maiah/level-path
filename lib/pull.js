function pull(keyPath, cb) {
  var currentObj = {};
  this.createReadStream({ start: keyPath, end: keyPath + '~'})
    .on('data', function (data) {
      var keySplit = data.key.split('/');
      var uuid = keySplit[1];

      if (currentObj.uuid === uuid) {
        currentObj[keySplit[2]] = data.value;
      } else {
        if (currentObj.uuid !== undefined) {
          cb(currentObj);
        }

        currentObj = {};
        currentObj.uuid = uuid;
        currentObj[keySplit[2]] = data.value;
      }
    });
}

module.exports = function (db) {
  db.pull = pull;
  return db;
};
