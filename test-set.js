var assert = require('assert');

var LevelUp = require('levelup'),
    LevelSet = require('./lib/set');

var db = LevelUp('./testdb');

LevelSet(db);

var ninja = {
	name: 'Maiah',
	occupation: 'Ninja'
};

db.set('/', ninja, function (err) {
	assert(!err);

	db.get('name', function (err, value) {
		assert.strictEqual(value, 'Maiah');
	});

	db.get('occupation', function (err, value) {
		assert(!err);
		assert.strictEqual(value, 'Ninja');
	});
});

ninja.tools = {
	lang: 'js'
}

db.set('/', ninja, function (err) {
	assert(!err);

	db.get('tools/lang', function (err, value) {
		assert(!err);
		assert.strictEqual(value, 'js');
	});
});

ninja.rig = {
	guitar: {
		distortion: 'Metalcore',
		equalizer: 'EQ7'
	}
}

db.set('/', ninja, function (err) {
	assert(!err);

	db.get('rig/guitar/distortion', function (err, value) {
		assert(!err);

		assert.strictEqual(value, 'Metalcore');
	});

	db.get('rig/guitar/equalizer', function (err, value) {
		assert(!err);

		assert.strictEqual(value, 'EQ7');
	});
});

ninja.country = {
	asia: {
		ph: {
			name: 'Philippines',
			capital: 'Manila'
		}
	},
	europe: 'Luxemborg'
}

db.set('/', ninja, function (err) {
	assert(!err);

	db.get('country/asia/ph/name', function (err, value) {
		assert(!err);

		assert.strictEqual(value, 'Philippines');
	});

	db.get('country/asia/ph/capital', function (err, value) {
		assert(!err);

		assert.strictEqual(value, 'Manila');
	});

	db.get('country/europe', function (err, value) {
		assert(!err);

		assert.strictEqual(value, 'Luxemborg');
	});
});