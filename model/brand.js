module.exports = function(mongoose) {
    var mongoose = require('mongoose');
    var Schema = mongoose.Schema;
    var brandSchema = new Schema({

        Name: String,
        Info: String,
        image: String,
        status
: {
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
    var Brand = mongoose.model('Brand', brandSchema);
    return Brand;
}
