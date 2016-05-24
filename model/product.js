module.exports = function(mongoose) {
    var mongoose = require('mongoose');
    var Schema = mongoose.Schema;
    var productSchema = new Schema({
        Sku: String,
        Name: String,
        Info: String,
        Price: Number,
        Discount: Number,
        image: String,
        BrandId: String,
        status: {
            type: 'string',
            enum: [
                'ACTIVE',
                'INACTIVE',
                'NOTVERIFIED',
                'DELETED'
            ],
            default: 'ACTIVE'
        }
    });
    var Product = mongoose.model('Product', productSchema);
    return Product;
}
