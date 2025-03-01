import { Accounts } from "meteor/accounts-base";
import { Meteor } from "meteor/meteor";
import { RoutePaths } from "/imports/ui/RoutePaths";
import { WalletsCollection } from "/imports/api/Wallets/WalletsCollection";

Accounts.emailTemplates.resetPassword = {
        subject() {
            return `Redefina sua senha`;
        },
        html(user, url) {
            return `<p>Olá ${user.username}, <br/><br/> Redefina sua senha com esse link <a href="${url}">${url}</a></p>`;
        },
        text(user, url) {
          return `Olá ${user} Redefina sua senha com esse link ${url}`;
     }
}

Accounts.urls.resetPassword = ( token ) => 
    Meteor.absoluteUrl(`${RoutePaths.RESET_PASSWORD.substring(1)}/${token}`);

Accounts.onCreateUser((options, user) => {
  
  WalletsCollection.insertAsync ({ balance: 0, currency: 'BRL', createdAt: new Date(), userId: user._id });
  return user;
  
});