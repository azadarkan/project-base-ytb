class CustomError extends Error {
    constructor(code, message, description) {
        super(`{"code": "${code}", "message": "${message}", "description": "${description}"}`)
        /* apostrof tırnak ile dolar içindeki değişkeni direkt string içine tanımlayabiliyoruz
         Böylece biz error'u bastığımızda yani console.log'larla vs bastığımızda bu ifadeyi (super(`{"code": "${code}", "message": "${message}", "description": "${description}"}`))komple ekrana yani loga basmış olacağız
         ve ardından this diğer alanları bize gönderilen alanları CutomError'un field'ları olarak tanımlıyoruz
        */
       this.code = code;
       this.message = message;
       this.description = description;

       // Yukarıdaki this'ler Error'un field'ları (properties) oluyor. Böylece biz Error'dan bir nesne oluşturduğumuzda bu field'lara erişebiliriz.

       /*
        Error.captureStackTrace(this, this.constructor); metodu, JavaScript'te hata nesnelerinin (Error objects) yığın izini (stack trace) kaydetmek için kullanılır.
        Bu metodu kullanmamızın temel nedeni, yığın izini daha temiz ve anlaşılır hale getirmektir.
        İki parametre alır:
        1. this: Bu, hata nesnesidir (bizim durumumuzda CustomError'un bir örneği).
        2. this.constructor: Bu, hata nesnesinin oluşturucusudur (yani CustomError sınıfı). Bu parametre, yığın izinde CustomError sınıfının constructor'ının görünmesini engeller. Eğer bu parametreyi kullanmazsak, yığın izinde constructor çağrısı görünebilir ve gereksiz detaylar içerebilir. Bu parametreyi kullanarak sadece hatanın gerçek kaynağını gösteren daha temiz bir yığın izi elde ederiz.
       */
       Error.captureStackTrace(this, this.constructor);

    }
}

/* Burad Error class'ından extends ettik ve constructor oluşturup buradan beklentimiz bir kod değeri, message ve description olsun; Response.js'teki message ve description ile uyumlu olsun diye aynı ismi verdik
Öncelikle error class'ının constructor'ını super() metodu ile çalıştırıyoruz
 */

module.exports = CustomError;