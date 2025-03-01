import { Meteor } from "meteor/meteor";
import { WalletsCollection } from "./WalletsCollection";

Meteor.publish("myWallet", () => {
  const userId = this;

  if ( ! userId ) {
    throw new Meteor.Error('not-authorized', 'Nao autorizado');
  }

  return WalletsCollection.find( userId);
});
