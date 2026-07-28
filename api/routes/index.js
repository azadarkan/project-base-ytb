var express = require('express');
var router = express.Router();

const fs = require("fs")

let routes = fs.readdirSync("./routes")

// dinamik routing yapısı
for (let route of routes) {
  if (route.includes(".js") && route != "index.js") { // route string'tir
    router.use ("/" + route.replace(".js", ""), require('./' + route))
    // direkt router.use ("/" + route) bunu yazsaydık: /users/users.js, /auditlogs/auditlogs.js vb yollar oluşurdu
    // direkt router.use ("/" + route.replace(".js", "")) bunu yazsaydık: /users, /auditlogs vb yollar oluşurdu
    // router.use ("/" + route.replace(".js", ""), require("./" + route))bunu yazarak sadece /users, /auditlogs vb yollar oluşmasını sağladık
  } 
}

module.exports = router;