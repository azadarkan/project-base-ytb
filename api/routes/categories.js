var express = require('express');
var router = express.Router();
const Categories = require("../db/models/Categories");
const Response = require("../lib/Response");
const CustomError = require("../lib/Error");
const Enum = require("../config/Enum");

/* GET users listing. */
router.get('/', async (req, res, next) => {

    try {
        let categories = await Categories.find({})
        
        res.json(Response.successResponse(categories))

        /* Burada ne mi yaptık? Bir değişken tanımladık veritabanından veri çektik ve bu değişkene atadık sonra data olarak bu değişkeni successResponse metoduna gönderdik.
        */

    } catch (err) {
        let errorResponse = Response.errorResponse(err);

        res.status(errorResponse.code).json(Response.errorResponse(err))
        /* Bir d ehata durumunda ne yapacağız? burda da err'yi göndereceğiz böylece bir hata durumunda error oluşmasını sağlayacağız
        */
    }

});
    // Bu şekilde göndermiş olduk hemen deneyelim

    // şimdi burada tanımımızı yapalım
    router.post('/add', async (req, res) =>  {
        let body = req.body;
        // bize gelen request'lerin body'sini buraya aldık.
        try {
            /* Dedik ki ben buraya bir kayıt yapacağım ama gelen verilen benim için önemli çünkü hangi verilerin gelip gelmediğini kontrol etmem lazım. Bu nedenle hangi verilerin geleceğini bir kontrol edelim ve Categories.js'e gidiyoruz (/api/db/models/Categories.js)
            */

            // Burada biz name alanı var mı diye kontrol edeceğiz
            if (!body.name) throw new CustomError(Enum.HTTP_CODES.BAD_REQUEST, "Validation Error!", "name fields must be filled") // yani bu alan dolu değilse bir CustomError fırlatmasını istedik, onu da catch'te yakalayacağız. CustomError geldiğinde buraya Enum tanımlayacağız öncelikle, kod alanlarını enum olarak burada kullanalım diye,biz burada validation field vereceğiz kısacası. Onun için config'e gidip Enum.js dosyası oluşturuyoruz.

            /**
             * Kısaca Enumdan Bahsedelim: enumeration (numaralandırma)'nın kısaltılışıdır Yani biz bazı değerleri Stirngleri veri varsa işte birden fazla tipte bunların herkesin anlayacağı ve kullanacağı standartlara oturtmaya çalıştığımızda biz buna bunu Enum olarak tanımlamamız gerekiyor Bu aslında JS için gayet kolay: bir obje tanımladık objenin altında değerler var ve bu değerlerin karşılıkları var biz Enum.HTTP_CODES.OK  dediğimizde aslında 200 değerini almış olacağız. Böylece HTTP_CODES altındaki değerlerden kolayca biz successRespons'u almış olacağız. Bu da şuna yarıyor açıkçası bunu gibi 200'ü vs'i akılda tutmaktansa, Burada import ettikten sonra Enum'ı şu şekilde kullanabilir hale geliyoruz (örn: Enum.HTTP_CODES.OK)
             */

            // Artık bir add endpointi eklediğimizde direkt CustomEror'ümüz hazır, Enum yapımız hazır, Response yapımız hazır olmuş oldu. Geldik burada bir kontrol daha yapmaya (name alanının dolu olduğu ana) eğer name alanınız doluysa artık biz veritabanına categories alanına gelen requesti kaydedebiliriz bizim categories tablomuzun modeli burada zaten (/api/db/models/Categories.js)

            // önce Categories modelinin nesnesini oluşturacağız
            let category = new Categories({
                // buraya dokümanın field'larını teker teker yazacağız
                name: body.name, // diyerek set ettik (set ettik demek: atama yaptık)

                // bunu da kontrol edebilirz ama zaten biz add işlemi yaptığımız için bunu body'den almamıza gerek yok direkt true olarak kaydedebiliriz hatta bunu hiç göndermesek bile default'u true olarak alacak zaten.
                is_active: true,

                // Şimdi gelelim created_by kısmına, burası da 
                created_by: req.user?.id 
                /* objectID = req.user.id olacak aslında. Şimdi bu alan (yani burası: created_by: req.user?.id)normalde şu anda yok çünkü biz henüz bir authentication mekanizması kurmadık.
                */ 
            })

            await category.save() // category'i oluşturdum bunu veritababnına kaydet İşte mongo'da bu işlemler bu kadar basit yani ORM kullanılıyor zaten find, save, deleteOne, updateOne diyeceğiz

            res.json(Response.successResponse({success: true})); // response.json'ı tanımladık bir de bunun error responseu var bu da:

        } catch (err) {
            // res.json(Response.errorResponse(err)); // şimdi biz response.json() dediğimizde son kullanıcıya hep 200 dönüyoruz yani şurada (postman'de) success response olarak dönüyoruz. Ama aslında biz bir hata durumunda 400 dönmemiz gerek Onun için status alanı ekliyoruz. 

            // res.status().json() HTTP yanıtının durum kodunu açıkça belirterek (zaten err kısmındayız ki burası da err olamlı 400'lü bişeyler olmalı)JSON verisi göndermenizi sağlar.

            // res.status(err.code || Enum.HTTP_CODES.INTERNAL_SERVER_ERROR).json(Response.errorResponse(err)); // eğer bu bir custom errorsa BAD_REQUEST gelecek eğer error code yoksa INTERNAL_SERVER_ERROR gelecek yani 500 dön.
            
            // Yukarıdaki gibi tanımlamaktansa bu şekilde tanımlamayı tercih edebiliriz:
            let errorResponse = Response.errorResponse(err);
            res.status(errorResponse.code).json(errorResponse); // normalde bu şekilde yazarsak 
        }
    })


module.exports = router;