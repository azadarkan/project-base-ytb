const CustomError = require("./Error");

class Response {
    constructor() {}

    static successResponse(data, code = 200) {
        return {
            code,
            data
        }
    }

    static errorResponse(error) {
        if (error instanceof CustomError){
            return {
                code: error.code,
                error: {
                    message: error.message,
                    description: error.description
                }
            }
        }

        return {
            code: Enum.HTTP_CODES.INTERNAL_SERVER_ERROR,
            error: {
                message: "Unknown Error!",
                description: error.message
            }
        }
    }
}

module.exports = Response;

/*
Biz bir class tanımladık ve bunu export ettik. Normalde biz bir class (Object Orianted Programming) bir class'ın içindeki field'lara (değişkenlere), attribute'lara (özelliklere) veya metod'lara (metotlara) erişmek için önce classın bir instance'ını almamız gerekiyor. Yani new anahtar kelimesiyle bir nesne oluşturmamız gerekiyor AMA eğer içinde metot statik metot varsa bu statik metotlara direkt class'ın referansıyla (adıyla) erişebiliriz. Neden peki? ÇÜünkü statik metotlar class'ın kendisine aittir, instance'a değil. Yani new anahtar kelimesi ile bir nesne oluşturmaya gerek kalmaksızın direkt classın adı nokta metod adıyla erişebiliyoruz. (ör: Response.successResponse())
 */