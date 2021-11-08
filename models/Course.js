const mongoose = require('mongoose');
const CourseSchema = mongoose.Schema({
    "title": {
        type: String,
        required: [true, 'Certification title must be supplied'],
        trim: true
    },
    "url": {
        type: String
    },
    "institution": {
        type: String,
        required: [true, "Institution's name must be supplied"],
        trim: true
    },
    "date": {
        type: Date
    },
    "creator_id": {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
});
module.exports = mongoose.model('Course', CourseSchema);