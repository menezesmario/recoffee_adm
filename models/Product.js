const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Por favor, adicione um título'],
        maxlength: [40, 'título não deve ter mais que 40 caracteres']
    },
    price: {
        type: String,
        required: [true, 'Por favor, adicione um preço'],
        maxlength: [10, 'Descrição não deve ter mais que 10 caracteres']
    }
})

module.exports = mongoose.models.Product || mongoose.model('Product', ProductSchema);