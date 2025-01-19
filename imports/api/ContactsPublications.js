import { Meteor } from "meteor/meteor";
import { ContactsCollection } from "./ContactsCollection";

Meteor.publish("contacts", () => {
  return ContactsCollection.find();
});