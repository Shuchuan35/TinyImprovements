const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const kudoSchema = new Schema({
    title: String,
    body: String,
    fromuser: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
});

const Kudo = mongoose.model('Kudo', kudoSchema);

module.exports = Kudo;