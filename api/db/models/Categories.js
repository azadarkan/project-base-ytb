const mongoose = require("mongoose");

// tablolarımızın fieldlarını burada tanımlıyoruz
const schema = mongoose.Schema({
    name: {type: String, required: true},
    is_active: {type: Boolean, default: true},
    created_by: {type: mongoose.SchemaTypes.ObjectId}, // şimdilik boş geçilebilir bıraktık ../routes/categories.js dosyasında auth kurduğumuzda burayı required true yapacağız. Boş geçilebilir halde bırakıyoruz şimdilik sonrasında 
    
},
{
    versionKey: false,
    timestamps: {
        createdAt: "created_at",
        updatedAt: "updated_at"
    }
})

class Categories extends mongoose.Model {

}
schema.loadClass(Categories)
module.exports = mongoose.model("categories", schema)