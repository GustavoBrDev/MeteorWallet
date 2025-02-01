import { Meteor } from 'meteor/meteor';
import '../imports/api/Contacts/ContactsCollection';
import '../imports/api/Contacts/ContactsPublications'
import '../imports/api/Contacts/ContactsMethods';
import '../imports/api/Transactions/TransactionsCollection';
import '../imports/api/Transactions/TransactionsMethods';
import '../imports/api/Wallets/WalletsMethods';
import '../imports/api/Wallets/WalletsCollection';
import '../imports/api/Wallets/WalletsPublications';
import '../infra/CustomError';

Meteor.startup( () => {

    const initializeWallet = async () => {
        try {
          if (!(await Meteor.callAsync('wallets.count'))) {
            await Meteor.callAsync('wallets.insert', 1000, 'BRL');
          }
        } catch (error) {
          console.error('Error initializing wallet:', error);
        }
      };

      initializeWallet();

});
