module.exports = function(mongoose) {
    var mongoose = require('mongoose');
    var Schema = mongoose.Schema;
    var subcategorySchema = new Schema({

        CategoryId: String,
        SubCategoryName: String,
        Code: Number,
        status: {
            type: 'string',
            enum: [
                'ACTIVE',
                'INACTIVE',
                'NOTVERIFIED',
                'DELETED'
            ],
            defaultsTo: 'ACTIVE'
        },

    });
    var Subcategory = mongoose.model('Subcategory', subcategorySchema);
    return Subcategory;
}
/*{
            type: Schema.ObjectId,
            ref: "category"
        },*/