const express = require("express");
const router = express.Router();


router.get("/:id", (req, res, next) => {
    // req: body, header'ın , query'nin , session'ın ... vs olduğu yer mininmum bilgileri barındırır.
    // res: requesten gelen isteğe döneceğimiz cevapları hazırladığımız yerdir. 
    // next: requesti bir sonraki middlewarea veya route handlara iletmek için kullanılır.
    console.log(">>> AUDITLOGS ROTASI")
    res.json({
        body: req.body,
        params: req.params,
        query: req.query,
        header: req.headers
    })


})

module.exports = router;