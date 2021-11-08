const mongoose = require('mongoose');
const StackSchema = mongoose.Schema({
    "technology": {
        type: String,
        required: [true, 'A name must be supplied'],
        trim: true
    },
    "img_url": {
        type: String,
        trim: true
    },
    "expertise": {
        type: Number,
        required: [true, "Skill level must be supplied"]
    },
    "creator_id": {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
});
module.exports = mongoose.model('Stack', StackSchema);