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
import '../infra/Accounts';
// @ts-ignore
import { Roles } from "meteor/roles";
import '../infra/Roles'
import { WalletRoles } from '/infra/WalletRoles';
import '../imports/api/RolesMethods'

Meteor.startup( () => {
    
    async function createAdmin () {
        const user =  await Meteor.users.findOneAsync({
            email: 'gustavo_stinghen@estudante.sesisenai.org.br'
        });
    
    
        if ( ! user || Roles.userIsInRoleAsync( user._id, WalletRoles.ADMIN)){
            return;
        }
    
        Roles.addUsersToRolesAsync( user._id, WalletRoles.ADMIN);
    }

    createAdmin();    
});
