import { Meteor } from "meteor/meteor";
import { ContactsCollection } from "./ContactsCollection";

Meteor.publish("contacts", () => {
  return ContactsCollection.find();
});

Meteor.publish("contacts.active", () => {

  const userId = this;

  if ( ! userId ) {
    throw new Meteor.Error('not-authorized', 'Nao autorizado');
  }

  return ContactsCollection.find({ userId, archived: { $ne: true } });
});

Meteor.publish("contacts.inactive", () => {
  
  const userId = this;

  if ( ! userId ) {
    throw new Meteor.Error('not-authorized', 'Nao autorizado');
  }

  return ContactsCollection.find({ userId, archived: { $eq: true} });
});