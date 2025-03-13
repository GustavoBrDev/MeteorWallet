import { Meteor } from "meteor/meteor";
// @ts-ignore
import { Roles } from "meteor/roles";
import { WalletRoles } from "/infra/WalletRoles";

Meteor.methods({
    "roles.isAdmin": () => {

        // @ts-ignore
        const { userId } = this;
    
        if ( ! userId ) {
            throw new Meteor.Error('not-authorized', 'Nao autorizado');
        }


        return Roles.userIsInRole(userId, WalletRoles.ADMIN);
    },
});