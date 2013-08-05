level-path
==========

Provides `push`, `pull`, and `liveStreamOn` methods to your LevelDB

### Install
```bash
npm install level-path
```

```js
var LevelUp = require('levelup'),
    LevelPath = require('level-path');

var db = LevelUp('./testdb');

LevelPath(db);
```

### Push JSON object
```js
var person = { name: 'Maiah', occupation: 'Ninja' };
db.push('persons', person);
```

This will put LevelDB data structure like below with auto-generated `uuid`.
```
persons/65cdd174-259e-4e9d-9a73-3f8f3bd12843/name = Maiah
persons/65cdd174-259e-4e9d-9a73-3f8f3bd12843/occupation = Ninja
```

### Pull JSON object
```js
db.pull('persons', function (person) {
  console.log(person.uuid);
  console.log(person.name);
  console.log(person.occupation);
});
```
