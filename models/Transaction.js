const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TransactionSchema = new Schema({
  payer: {type: Schema.Types.ObjectId, ref:'Account'},
  beneficiary: {type: Schema.Types.ObjectId, ref:'Account'},
  amount: {type: Number , default:0},
  date: {type: Date, default: Date.now()}

});

module.exports = mongoose.model('Transaction', TransactionSchema);
