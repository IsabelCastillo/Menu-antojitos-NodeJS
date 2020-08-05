var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var platilloSchema = new Schema({
    strNombre: {
        type: String,
        required: [true, 'Se requiere ingresar el nombre del platillo'],
        unique: true
    },
    strDescripcion: {
        type: String
    },
    strIngredientes: {
        type: String
    },
    nmbPiezas: {
        type: Number
    },
    nmbPrecio: {
        type: Number
    },
    categoria: {
        type: Schema.Types.ObjectId,
        ref: 'Categoria'
    },
    blnStatus: {
        type: Boolean
    }

});


module.exports = mongoose.model('Platillo', platilloSchema);