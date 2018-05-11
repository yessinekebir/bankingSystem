const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AccountSchema = new Schema({
  name: {type: String, required: true},
  surname: {type: String, required: true},
  country: {type: String, required: true},
  email: {type: String, unique: true, required: true},
  password: {type: String, required: true},
  receivedTransactions: [{type: Schema.Types.ObjectId, ref:'Transaction',index:{sparse:true}}],
  sentTransactions: [{type: Schema.Types.ObjectId, ref:'Transaction',index:{sparse:true}}],
  amount: {type:Number,default:5000},
  iban: {type: String}
});

module.exports = mongoose.model('Account', AccountSchema);
