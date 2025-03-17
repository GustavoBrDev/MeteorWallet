const { ContactsCollection } = require("./ContactsCollection");
import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

Meteor.methods({
    'contacts.insert' ( { nome, email, imageUrl, walletId } ) {

        if (!this.userId) {
            throw new Meteor.Error('not-authorized', 'Nao autorizado');
        }

        check ( nome, String );
        check ( email, String );
        check ( imageUrl, String );

        if ( ! nome ){
            throw new Meteor.Error('name-required', 'O campo Nome é obrigatório.');
        }

        if ( ! walletId ){
            throw new Meteor.Error('wallet-required', 'O campo de ID carteira é obrigatório.');
        }

        return ContactsCollection.insertAsync({ nome, email, imageUrl, walletId, createdAt: new Date(), userId : this.userId });
    },

    'contacts.remove' ( { contactId } ) {
        return ContactsCollection.removeAsync(contactId);
    },

    'contacts.archive' ( { contactId } ) {
        return ContactsCollection.updateAsync( { _id: contactId }, {$set: { archived: true }} );
    }
});