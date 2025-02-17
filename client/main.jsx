import React from 'react';
import { createRoot } from 'react-dom/client';
import { Meteor } from 'meteor/meteor';
import { App } from '/imports/ui/App';
import './main.css';
import '../imports/api/Contacts/ContactsMethods.js'
import '../imports/api/Transactions/TransactionsMethods';



Meteor.startup(() => {
  const container = document.getElementById('react-target');
  const root = createRoot(container);
  root.render(<App />);
});
