var express = require('express');
var router = express.Router();
var Account = require('../models/Account');
var Transaction = require('../models/Transaction');
var auth = require('../middlewares/auth');

router.post('/send/:id', auth.verify,  function(req, res){
  if(req.account.amount>=req.body.amount){
    Account.findById(req.params.id, function(err, account) {
      if (err) return res.status(500).json({message: 'Account not find'});
      var newTransaction = new Transaction();
      newTransaction.payer = req.account._id;
      newTransaction.beneficiary = req.params.id;
      newTransaction.amount = req.body.amount;
      newTransaction.save(function(err, newTransactionSaved) {
        if (err) return res.status(500).json({message: err});
        req.account.amount-=req.body.amount;
        req.account.sentTransactions.push(newTransactionSaved._id);
        req.account.save(function(err, accountSaved) {
          account.receivedTransactions.push(newTransactionSaved._id);
          account.amount += req.body.amount;
          account.save(function(err, accountUpdated){
            res.status(201).json(newTransactionSaved)
          })

        })

      })
    })
  }
  else {
    res.json({err: 'You do not have a lot of money'})
  }

});
// Lista transazioni effettuate/ricevute per account + filtraggio
router.get('/:id', function(req, res) {
  if(req.query.filter){
    if(req.query.filter=="sent"){
      Account.findById(req.params.id, 'name surname date sentTransactions', function (err, accounts) {
        res.json(accounts);
      });
    }
    else if(req.query.filter=="received"){
      Account.findById(req.params.id, 'name surname date receivedTransactions', function (err, accounts) {
        res.json(accounts);
      });
    }
    else {
      res.json({err: 'Query non valida'});
    }
  }
  else {
    Account.findById(req.params.id, 'name surname date receivedTransactions sentTransactions ', function (err, accounts) {
      res.json(accounts);
    });
  }
})


module.exports = router;
