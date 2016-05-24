module.exports = function(mongoose) {
    var mongoose = require('mongoose');
    var Schema = mongoose.Schema;
    var orderSchema = new Schema({
        ProductId: String,
        CustomerId: String,
        Quantity: Number,
        Amount: Number,
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
    var Order = mongoose.model('Order', orderSchema);
    return Order;
}
