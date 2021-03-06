var express = require('express');
var router = express.Router();
var bcrypt = require('bcrypt');
var jwt = require('jwt-simple');
var Account = require('../models/Account');
var auth = require('../middlewares/auth');

var generateIban = function (country){
  var iban = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (var i = 0; i < 26; i++)
    iban += possible.charAt(Math.floor(Math.random() * possible.length));
    iban = country.substring(0,2).toUpperCase()+iban;
  return iban;
}

router.post('/signup', function(req, res) {
    var account = new Account();
    account.name = req.body.name;
    account.surname = req.body.surname;
    account.password = bcrypt.hashSync(req.body.password, 10);
    account.email = req.body.email;
    account.country = req.body.country;
    account.iban = generateIban(req.body.country);
    account.save(function(err, accountCreated) {
        if (err) return res.status(400).json(err);
        res.status(201).json(accountCreated);
    })
})

router.post('/login', function(req, res) {
    Account.findOne({email: req.body.email}, function(err, account){
        if (account === null) {
            return res.status(404).json({message: 'Account not found'})
        } else if (bcrypt.compareSync(req.body.password, account.password)) {
            var token = jwt.encode(account._id, auth.secret);
            return res.json({token: token});
        } else {
            return res.status(401).json({message: 'password not valid'});
        }

    })

})

router.get('/me', auth.verify, function(req, res, next) {
    res.json(req.account);
});

router.get('/name', auth.verify, function(req, res) {
    res.json(req.account.name);
})

router.get('/accounts/:name', function(req, res) {
  Account.find({name: req.params.name}, 'name email', function (err, accounts) {
      res.json(accounts);
  });
})

router.get('/accounts', auth.verify, function(req, res) {
  Account.find({}, function (err, accounts) {
      res.json(accounts);
  });
})


module.exports = router;
