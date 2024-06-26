const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const skillSchema = new Schema ({
    name: {
        type: String,
        required: true,
    },
    sortOrder: {
        type: Number,
    }
}, {
    timestamps: true
});


module.exports = mongoose.model('Skill', skillSchema);