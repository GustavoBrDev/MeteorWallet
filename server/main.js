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
// import '../infra/Accounts';

Meteor.startup( () => {

});
