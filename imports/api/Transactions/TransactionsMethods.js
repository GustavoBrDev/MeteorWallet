import { TransactionsCollection, TRANSFER_TYPE, ADD_TYPE } from "./TransactionsCollection";
import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import SimpleSchema  from 'simpl-schema';

Meteor.methods ({

    'transactions.insert' ( { data } ) {

        const userId = this;

        if ( ! userId ) {
            throw new Meteor.Error('not-authorized', 'Nao autorizado');
        }

        const schema = new SimpleSchema({
            isTransfering: { type: Boolean },
            sourceWalletId: { type: String },
            destinationContactId: { type: String, optional:  ! data.isTransfering },
            amount: { type: Number, min: 1 },
            userId: { type: String },
        });

        const dataClean = schema.clean(data);
        schema.validate(dataClean);

        const { isTransfering, sourceWalletId, destinationContactId, amount } = dataClean;


        return TransactionsCollection.insertAsync({ 
            type: isTransfering ? TRANSFER_TYPE : ADD_TYPE, 
            sourceWalletId, 
            destinationContactId: isTransfering ? destinationContactId : null,
            amount, 
            userId,
            createdAt: new Date() });
    },

    'transactions.remove' ( { transactionId } ) {
        check ( transactionId, String );
        return TransactionsCollection.removeAsync(transactionId);
    }

});
