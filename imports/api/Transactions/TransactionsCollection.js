import 'meteor/aldeed:collection2/static';
import 'meteor/matb33:collection-hooks';
import { Mongo } from "meteor/mongo";
import SimpleSchema from "simpl-schema";
import { WalletsCollection } from "../Wallets/WalletsCollection";

export const TransactionsCollection = new Mongo.Collection("transactions");

/*class TransactionsMongoCollection extends Mongo.Collection {
   async insertAsync (transactionDocument, callback) {
    transactionDocument.createdAt = new Date();
  
    if (transactionDocument.type === TRANSFER_TYPE) {
      const sourceWallet = await WalletsCollection.findOneAsync(transactionDocument.sourceWalletId);
  
      if (!sourceWallet) {
        throw new Meteor.Error('wallet-not-found', 'Carteira de origem não encontrada.');
      }
  
      if (sourceWallet.balance < transactionDocument.amount) {
        throw new Meteor.Error('not-enough-balance', 'Saldo insuficiente.');
      }
  
      await WalletsCollection.updateAsync(transactionDocument.sourceWalletId, { $inc: { balance: -transactionDocument.amount } });
      await WalletsCollection.updateAsync(transactionDocument.destinationWalletId, { $inc: { balance: transactionDocument.amount } });
    }
  
    if (transactionDocument.type === ADD_TYPE) {
      const sourceWallet = await WalletsCollection.findOneAsync(transactionDocument.sourceWalletId);
  
      if (!sourceWallet) {
        throw new Meteor.Error('wallet-not-found', 'Carteira não encontrada.');
      }
  
      await WalletsCollection.updateAsync(transactionDocument.sourceWalletId, { $inc: { balance: transactionDocument.amount } });
    }
  
    return super.insertAsync(transactionDocument, callback);
  }
}*/

// export const TransactionsCollection = new TransactionsMongoCollection("transactions");

// @ts-ignore
TransactionsCollection.before.insert ( async function ( userId, transactionDocument ) {
  transactionDocument.createdAt = new Date();
  
    if (transactionDocument.type === TRANSFER_TYPE) {
      const sourceWallet = await WalletsCollection.findOneAsync(transactionDocument.sourceWalletId);
  
      if (!sourceWallet) {
        throw new Meteor.Error('wallet-not-found', 'Carteira de origem não encontrada.');
      }
  
      if (sourceWallet.balance < transactionDocument.amount) {
        throw new Meteor.Error('not-enough-balance', 'Saldo insuficiente.');
      }
  
      await WalletsCollection.updateAsync(transactionDocument.sourceWalletId, { $inc: { balance: -transactionDocument.amount } });
      await WalletsCollection.updateAsync(transactionDocument.destinationWalletId, { $inc: { balance: transactionDocument.amount } });
    }
  
    if (transactionDocument.type === ADD_TYPE) {
      const sourceWallet = await WalletsCollection.findOneAsync(transactionDocument.sourceWalletId);
  
      if (!sourceWallet) {
        throw new Meteor.Error('wallet-not-found', 'Carteira não encontrada.');
      }
  
      await WalletsCollection.updateAsync(transactionDocument.sourceWalletId, { $inc: { balance: transactionDocument.amount } });
    }
  
});

export const TRANSFER_TYPE = "TRANSFERÊNCIA";
export const ADD_TYPE = "ADIÇÃO";

const TransactionsSchema = new SimpleSchema({
  type: {
    type: String,
    allowedValues: [TRANSFER_TYPE, ADD_TYPE],
  },
  sourceWalletId: {
    type: String,
    // regEx: SimpleSchema.RegEx.Id,
  },
  destinationWalletId: {
    type: String,
    optional: true,
    // regEx: SimpleSchema.RegEx.Id,
  },
  amount: {
    type: Number,
    min: 1,
  },
  createdAt: {
    type: Date,
  },
});

TransactionsCollection.attachSchema(TransactionsSchema);

TransactionsCollection.deny({
  insert: function() { return true; },
  update: function() { return true; },
  remove: function() { return true; }
});