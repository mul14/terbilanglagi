/* vi: set ts=2 sw=2 tw=0 et ff=unix ft=javascript: */

'use strict'

/**
 * Based on http://notes.rioastamal.net/2012/03/membuat-fungsi-terbilang-pada-php.html
 */

var util = require('util');

module.exports = function (value) {
  value = parseFloat(value);
  // array bilangan
  // sepuluh dan sebelas merupakan special karena awalan 'se'
  var bilangan = [
    '',
    'satu',
    'dua',
    'tiga',
    'empat',
    'lima',
    'enam',
    'tujuh',
    'delapan',
    'sembilan',
    'sepuluh',
    'sebelas'
  ];

  var division, modulus;

  // pencocokan dimulai dari satuan angka terkecil
  if (value < 12) {
    // mapping angka ke index array bilangan
    return bilangan[value];
  } else if (value < 20) {
    // bilangan 'belasan'
    // misal 18 maka 18 - 10 = 8
    return bilangan[value - 10] + ' belas';
  } else if (value < 100) {
    // bilangan 'puluhan'
    // misal 27 maka 27 / 10 = 2.7 (integer => 2) 'dua'
    // untuk mendapatkan sisa bagi gunakan modulus
    // 27 mod 10 = 7 'tujuh'
    division = parseInt(value / 10);
    modulus = value % 10;
    return String.prototype.trim(util.format('%s puluh %s', bilangan[division], bilangan[modulus]));
  } else if (value < 200) {
    // bilangan 'seratusan' (itulah indonesia knp tidak satu ratus saja? :))
    // misal 151 maka 151 = 100 = 51 (hasil berupa 'puluhan')
    // daripada menulis ulang rutin kode puluhan maka gunakan
    // saja fungsi rekursif dengan memanggil fungsi terbilang(51)
    return util.format('seratus %s', terbilang(value - 100));
  } else if (value < 1000) {
    // bilangan 'ratusan'
    // misal 467 maka 467 / 100 = 4,67 (integer => 4) 'empat'
    // sisanya 467 mod 100 = 67 (berupa puluhan jadi gunakan rekursif terbilang(67))
    division = parseInt(value / 100);
    modulus = value % 100;
    return String.prototype.trim(util.format('%s ratus %s', bilangan[division], terbilang(modulus)));
  } else if (value < 2000) {
    // bilangan 'seribuan'
    // misal 1250 maka 1250 - 1000 = 250 (ratusan)
    // gunakan rekursif terbilang(250)
    return String.prototype.trim(util.format('seribu %s', terbilang(value - 1000)));
  } else if (value < 1000000) {
    // bilangan 'ribuan' (sampai ratusan ribu
    division = parseInt(value / 1000); // karena hasilnya bisa ratusan jadi langsung digunakan rekursif
    modulus = value % 1000;
    return util.format('%s ribu %s', terbilang(division), terbilang(modulus));
  } else if (value < 1000000000) {
    // bilangan 'jutaan' (sampai ratusan juta)
    // 'satu puluh' => SALAH
    // 'satu ratus' => SALAH
    // 'satu juta' => BENAR
    // @#$%^ WT*

    // hasil bagi bisa satuan, belasan, ratusan jadi langsung kita gunakan rekursif
    division = parseInt(value / 1000000);
    modulus = value % 1000000;
    return String.prototype.trim(util.format('%s juta %s', terbilang(division), terbilang(modulus)));
  } else if (value < 1000000000000) {
    // bilangan 'milyaran'
    division = parseInt(value / 1000000000);
    // karena batas maksimum integer untuk 32bit sistem adalah 2147483647
    // maka kita gunakan fmod agar dapat menghandle angka yang lebih besar
    modulus = fmod(value, 1000000000);
    return String.prototype.trim(util.format('%s milyar %s', terbilang(division), terbilang(modulus)));
  } else if (value < 1000000000000000) {
    // bilangan 'triliun'
    division = value / 1000000000000;
    modulus = fmod(value, 1000000000000);
    return String.prototype.trim(util.format('%s triliun %s', terbilang(division), terbilang(modulus)));
  } else {
    return 'Wow...';
  }
}
