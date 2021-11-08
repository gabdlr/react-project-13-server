const mongoose = require('mongoose');
const ToolSchema = mongoose.Schema({
    "technology": {
        type: String,
        required: [true, 'A name must be supplied'],
        trim: true
    },
    "img_url": {
        type: String,
        trim: true
    },
    "creator_id": {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
});
module.exports = mongoose.model('Tool', ToolSchema);