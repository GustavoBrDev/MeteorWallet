import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
// @ts-ignore
import { Roles } from 'meteor/roles'; 
import { TransactionsCollection,TRANSFER_TYPE,ADD_TYPE, } from './TransactionsCollection';
import { WalletRoles } from '/infra/WalletRoles';

Meteor.methods({
  'transactions.insert'( { isTransferring, sourceWalletId, destinationContactId, amount } ) {
    const { userId } = this;
    if (!userId) {
      throw new Meteor.Error('not-authorized', 'Nao autorizado');
    }
    return TransactionsCollection.insertAsync({
      type: isTransferring ? TRANSFER_TYPE : ADD_TYPE,
      sourceWalletId,
      destinationContactId: isTransferring ? destinationContactId : null,
      amount,
      createdAt: new Date(),
      userId,
    });
  },
  'transactions.remove'(transactionId) {
    const { userId } = this;
    if (!userId) {
      throw new Meteor.Error('not-authorized', 'Nao autorizado');
    }
    check(transactionId, String);

    if (!Roles.userIsInRole(userId, WalletRoles.ADMIN)) {
      throw new Error('Permission denied');
    }

    return TransactionsCollection.removeAsync(transactionId);
  },
});