var assert = require('assert'),
		async = require('async');

var LevelUp = require('levelup'),
     LevelPath = require('./index.js');

var db = LevelUp('./testdb');

// open a new path
LevelPath(db);

var ninja = {
	name: 'Maiah',
	occupation: 'Ninja'
};

async.series([
	function () {
		db.set('/', ninja, function (err) {
			assert(!err);
		});
	},
	function () {
		db.pull('/', function (err, res) {
			assert(!err);
			assert(res);

			assert.strictEqual(res.name, 'Maiah'):
			assert.strictEqual(res.occupation, 'Ninja');
		});
	},
	function () {
		db.del('name');
		db.del('occupation');
	},
	function () {
		db.push('/', ninja, function (err) {
			assert(!err);
		});
	},
	function () {
		db.pull('/', function (err, res) {
			assert(!err);
			assert(res);
			assert.strictEqual(res.length, 1);

			var uuid = null;
			for (uuid in res) {
				var uu = res[uuid];
				assert.strictEqual(uu.name, 'Maiah');
				assert.strictEqual(uu.occupation, 'Ninja');
			}

			db.del(uuid);
		});
	},
	function () {
		db.set('/persons', ninja, function (err) {
			assert(!err);
		});
	},
	function () {
		db.pull('/persons', function (err, res) {
			assert(!err);
			assert(res);

			assert.strictEqual(res.name, 'Maiah');
			assert.strictEqual(res.occupation, 'Ninja');
		});
	},
	function () {
		db.del('persons/name');
		db.del('persons/occupation');
	},
	function () {
		db.push('/persons', ninja, function (err) {
			assert(!err);
		});
	},
	function () {
		db.pull
	}
]);
