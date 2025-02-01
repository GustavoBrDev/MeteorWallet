import { TransactionsCollection, TRANSFER_TYPE, ADD_TYPE } from "./TransactionsCollection";
import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import SimpleSchema  from 'simpl-schema';

Meteor.methods ({

    'transactions.insert' ( { data } ) {

        const schema = new SimpleSchema({
            isTransfering: { type: Boolean },
            sourceWalletId: { type: String },
            destinationWalletId: { type: String, optional:  ! data.isTransfering },
            amount: { type: Number, min: 1 }
        });

        const dataClean = schema.clean(data);
        schema.validate(dataClean);

        const { isTransfering, sourceWalletId, destinationWalletId, amount } = dataClean;


        return TransactionsCollection.insertAsync({ 
            type: isTransfering ? TRANSFER_TYPE : ADD_TYPE, 
            sourceWalletId, 
            destinationWalletId: isTransfering ? destinationWalletId : null,
            amount, 
            createdAt: new Date() });
    },

    'transactions.remove' ( { transactionId } ) {
        check ( transactionId, String );
        return TransactionsCollection.removeAsync(transactionId);
    }

});
