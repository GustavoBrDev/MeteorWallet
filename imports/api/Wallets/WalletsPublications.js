import { Meteor } from "meteor/meteor";
import { WalletsCollection } from "./WalletsCollection";

Meteor.publish("wallets", () => {
  return WalletsCollection.find();
});
