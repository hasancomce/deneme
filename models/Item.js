const mongoose = require('mongoose')

const ItemSchema = new mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        auto: true,
    },
    "image": { type: String, required: false, default: "/img/item-images/default-item-image.jpg" },
    "materia_id": { type: String },
    "category_id": { type: String },
    "color": { type: String },
    "brand_id": { type: String },
    "model_no": { type: String },
    "model_name": { type: String },
    "surface_finish": { type: String },
    "width": { type: String },
    "height": { type: String },
})

module.exports = mongoose.model('Item', ItemSchema)