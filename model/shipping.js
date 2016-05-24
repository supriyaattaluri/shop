module.exports = function(mongoose) {
    var mongoose = require('mongoose');
    var Schema = mongoose.Schema;
    var shippingSchema = new Schema({

        Carrier: String,
        OrderId: String,
        status: {
            type: 'string',
            enum: [
                'ACTIVE',
                'INACTIVE',
                'NOTVERIFIED',
                'DELETED'
            ],
            defaultsTo: 'ACTIVE'
        }
    });
    var Shipping = mongoose.model('Shipping', shippingSchema);
    return Shipping;
}
