import 'meteor/aldeed:collection2/static';
import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

export const WalletsCollection = new Mongo.Collection("wallets");


const walletsSchema = new SimpleSchema({
    balance: {
        type: Number,
        min: 0,
    },
    currency: {
        type: String,
        allowedValues: ['BRL', 'USD', 'EUR'],
        defaultValue: 'BRL'
    },
    createdAt: {
        type: Date,
    },
    userId : {
        type: String,
    }
});

WalletsCollection.attachSchema(walletsSchema);