const User = require('../models/User');
const Kudo = require('../models/Kudo');

module.exports = function (app) {

    app.get('/api/kudos', function (req, res) {
        Kudo.find({})
            .then(function (data) {
                res.json(data);
            })
            .catch(function (err) {
                res.json(err);
            });
    });

    app.get('/api/users', function (req, res) {
        User.find({})
            .populate('kudos')
            .then(function (data) {
                res.json(data);
            })
            .catch(function (err) {
                res.json(err);
            });
    });

    app.get('/api/user/:id', function (req, res) {
        User.findOne({kudos: req.params.id})
        .then(function (data) {
          res.json(data);
        })
        .catch(function (err) {
          res.json(err);
        });
      });

    app.post('/api/users', function (req, res) {
        User.create(req.body)
            .then(function (data) {
                res.json(data);
            })
            .catch(function (err) {
                res.json(err);
            });
    });

    app.post('/api/kudo', function (req, res) {
        const userId = req.body.toUser;
        const newEntry = {
            title: req.body.title,
            body: req.body.body,
            fromuser: req.body.fromUser
        }
        Kudo.create(newEntry)
            .then(function (kudoData) {
                return User.findOneAndUpdate({ _id: userId }, { $push: { kudos: kudoData._id } }, { new: true });
            })
            .then(function (userData) {
                res.json(userData);
            })
            .catch(function (err) {
                res.json(err);
            });
    });
}