module.exports = function(mongoose) {
    var mongoose = require('mongoose');
    var Schema = mongoose.Schema;
    var categorySchema = new Schema({
        CategoryName: String,
        Unicode: String,
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
    var Category = mongoose.model('Category', categorySchema);
    return Category;
}
