'use strict'

var assert = require('assert');

var terbilang = require('../terbilang.js');
var angka = require('./angka.json');

describe('Angka', function()
{
    for (var key in angka)
    {
        it(key + ' should return ' + angka[key], function() {
            assert.equal(terbilang(key), angka[key]);
        });
    }
});
