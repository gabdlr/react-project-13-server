const mongoose = require('mongoose');
const EducationSchema = mongoose.Schema({
    "institution": {
        type: String,
        required: [true, "Institution's name must be supplied"],
        trim: true
    },
    "degree": {
        type: String,
        required: [true, "Degree must be supplied"],
        trim: true
    },
    "state": {
        type: String,
        required: [true, "Current state must be informed"],
        trim: true
    },
    "period_start": {
        type: Date,
    },
    "period_end": {
        type: Date,
    },
    "creator_id": {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
});
module.exports = mongoose.model('Education', EducationSchema);