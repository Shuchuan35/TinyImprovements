const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const kudoSchema = new Schema({
    title: String,
    body: String,
    fromuser: String
});

const Kudo = mongoose.model('Kudo', kudoSchema);

module.exports = Kudo;