import { Meteor } from "meteor/meteor";
import { ContactsCollection } from "./ContactsCollection";

Meteor.publish("contacts", function() {
  return ContactsCollection.find();
});

Meteor.publish("contacts.active", function() {
  if (!this.userId) {
    return this.ready();
  }

  return ContactsCollection.find({ 
    userId: this.userId, 
    archived: { $ne: true } 
  });
});

Meteor.publish("contacts.inactive", function() {
  if (!this.userId) {
    return this.ready();
  }

  return ContactsCollection.find({ 
    userId: this.userId, 
    archived: { $eq: true } 
  });
});