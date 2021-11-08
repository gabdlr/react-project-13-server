const mongoose = require('mongoose');
const JobSchema = mongoose.Schema({
    "role": {
        type: String,
        required: [true, 'Job position must be supplied'],
        trim: true
    },
    "company": {
        type: String,
        required: [true, 'The company name must be supplied'],
        trim: true
    },
    "period_start": {
        type: Date
    },
    "period_end": {
        type: Date
    },
    "creator_id": {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
});
module.exports = mongoose.model('Job', JobSchema);