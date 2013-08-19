level-path
==========

Provides `set`, `push`, `pull`, and `liveStreamOn` methods to your LevelDB

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

### Set JSON object
```js
var person = { name: 'Maiah', occupation: 'Ninja' };
db.set('/', person, function (err) {
  if (!err) console.log('Saved person under root path');
});
```

This will put LevelDB data structure at the `root` path.
```
name = Maiah
occupation = Ninja
```

You can also save any JSON structure as long as it is a valid JSON object.
```js
var person = {
  name: 'Maiah',
	occupation: 'Ninja',
	tools: {
	  lang: 'js'
	}
};

db.set('/', person, function (err) {
  if (!err) console.log('Saved person under root path');
});

```

This will put LevelDB data structure at the `root` path.
```
name = Maiah
occupation = Ninja
tools/lang = js
```

You can also specify a path other than the `root`.
```js
var person = { name: 'Maiah', occupation: 'Ninja' };
db.set('/person', person, function (err) {
  if (!err) console.log('Saved person under root path');
});

```

This will put LevelDB data structure at the `person` path.
```
person/name = Maiah
person/occupation = Ninja
person/tools/lang = js
```

### Push JSON object
```js
var person = { name: 'Maiah', occupation: 'Ninja' };
db.push('persons', person, function (err) {
  if (!err) console.log('Saved person!');
});
```

This will put LevelDB data structure like below with auto-generated `uuid`.
```
persons/65cdd174-259e-4e9d-9a73-3f8f3bd12843/name = Maiah
persons/65cdd174-259e-4e9d-9a73-3f8f3bd12843/occupation = Ninja
```

### Pull JSON object
```js
db.pull('persons', function (err, res) {
  if (!err) {
    console.dir(res);
  }
});
```

This will show a JSON like below.
```
{
  65cdd174-259e-4e9d-9a73-3f8f3bd12843: {
    name: 'Maiah',
    occupation: 'Ninja'
  }
}
```