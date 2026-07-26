const mongoose = require("mongoose");

// tablolarımızın fieldlarını burada tanımlıyoruz
const schema = mongoose.Schema({
    role_name: {type: String, required: true},
    is_active: { type: Boolean, default: true },
    // created_by alanı dolu olmadan bu schema'ya bir şey dolduramayız dedik
    created_by: {
        type: mongoose.SchemaTypes.ObjectId,
        required: true
    }
},
{
    versionKey: false, // mongoose'da versionKey kendiliğinden oluşuyor bunu otomatik false yapıyoruz
    // timestamps: true
    timestamps: {
        createdAt: "created_at",
        updatedAt: "updated_at"
    }
})

// bir class'tan türetilen farklı class'lar oluşturabiliyoruz bu yüzden extends yazıyoruz
class Roles extends mongoose.Model {

}
schema.loadClass(Roles)
module.exports = mongoose.model("Roles", schema)