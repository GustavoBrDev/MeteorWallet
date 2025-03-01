import { Accounts } from "meteor/accounts-base";
import { Meteor } from "meteor/meteor";
import { RoutePaths } from "/imports/ui/RoutePaths";

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