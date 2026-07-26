// Express kütüphanesinden router modülünü alıyoruz
var express = require('express');
// Router modülünü kullanarak bir router nesnesi oluşturuyoruz
var router = express.Router();

/* GET home page. */
// GET metodu ile '/' adresine bir istek geldiğinde çalışacak fonksiyon
router.get('/', function(req, res, next) {
  // EJS template motorunu kullanarak 'index' template'ini render ediyoruz
  // 'title' değişkenini 'Express' olarak template'e gönderiyoruz
  res.render('index', { title: 'Azad' });
});

module.exports = router;