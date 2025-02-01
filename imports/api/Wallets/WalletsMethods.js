import { WalletsCollection } from "./WalletsCollection"
import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

Meteor.methods ({
    'wallets.insert' ( balance, currency ) {

        check ( balance, Number );
        check ( currency, String );

        if ( ! balance || balance <= 0 ) {
            throw new Meteor.Error('amount-required', 'O campo de valor é obrigatório.');
        }

        if ( ! currency ){
            throw new Meteor.Error('currency-required', 'O campo de moeda é obrigatório.');
        }   

        return WalletsCollection.insertAsync({ balance, currency, createdAt: new Date() });
    },

    'wallets.remove' ( { walletId } ) {
        check ( walletId, String );

        if ( ! walletId ){
            throw new Meteor.Error('wallet-required', 'O campo de ID carteira é obrigatório.');
        }

        return WalletsCollection.removeAsync(walletId);
    },

    'wallets.count' () {
        return WalletsCollection.find().countAsync();
    }
});