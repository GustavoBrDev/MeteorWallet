import { Meteor } from "meteor/meteor";
import { ContactsCollection } from "./ContactsCollection";

Meteor.publish("contacts", () => {
  return ContactsCollection.find();
});

Meteor.publish("contacts.active", () => {
  return ContactsCollection.find({ archived: { $ne: true } });
});

Meteor.publish("contacts.inactive", () => {
  return ContactsCollection.find({ archived: { $eq: true} });
});