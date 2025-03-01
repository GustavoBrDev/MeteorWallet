import 'meteor/aldeed:collection2/static';
import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

export const ContactsCollection = new Mongo.Collection('contacts');

const ContactsSchema = new SimpleSchema({
  name: {
    type: String,
  },
  email: {
    type: String
  },
  createdAt: {
    type: Date,
    autoValue: function() {
      if (this.isInsert) {
        return new Date();
      }
    }
  }, 
  userId: {
    type: String,
  },
  walletId: {
    type: String,
  }
});

ContactsCollection.attachSchema(ContactsSchema);