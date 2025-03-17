import { Meteor } from "meteor/meteor";
import { WalletsCollection } from "./WalletsCollection";

Meteor.publish("myWallet", function() {
  if (!this.userId) {
    return this.ready();
  }

  return WalletsCollection.find({ 
    userId: this.userId 
  });
});