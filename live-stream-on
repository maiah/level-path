function liveStreamOn(event, keyPath, cb) {
  var self = this;
  self.cbs[keyPath] = cb;

  if (!self.liveStreamInvoked) {
    self.liveStreamInvoked = true;

    //  for now, only supports `data` event
    self.liveStream()
      .on(event, function (data) {
        for (var key in self.cbs) {
          if (data.key.indexOf(key) === 0) {
            self.cbs[key](data);
          }
        }
      });
  }
}

module.exports = function (db) {
  db.liveStreamInvoked = false;
  db.cbs = {};
  db.liveStreamOn = liveStreamOn;
  return db;
};
