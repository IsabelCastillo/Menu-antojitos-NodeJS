const mongoose = require('mongoose');

//obtiene el cascaron para crear esquemas de mongoose
let Schema = mongoose.Schema;

let categoriaSchema = new Schema({
    strNombre: {
        type: String,
        required: [true, 'El nombre de la categoria es necesario!!!!'],
        unique: true
    },
    strDescripcion: {
        type: String
    },
    blnStatus: {
        type: Boolean
    }
});

//para exportar este modelo
module.exports = mongoose.model('categoria', categoriaSchema);