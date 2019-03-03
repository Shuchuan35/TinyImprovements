const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 3000;
const MONGODB_URI = require('./config/keys');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

mongoose.connect(MONGODB_URI || 'mongodb://localhost/improvement', {useNewUrlParser: true });
// mongoose.connect('mongodb://localhost/improvement' || MONGODB_URI, {useNewUrlParser: true });

require('./routes/api-routes')(app);

app.listen(PORT, function (data) {
    console.log(`Listening on localhost:${PORT}`);
});

