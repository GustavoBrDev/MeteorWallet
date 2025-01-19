import React from "react";
import { ContactsCollection } from "../api/ContactsCollection";
import { useTracker, useSubscribe } from "meteor/react-meteor-data";

export const ContactList = () => {

    const isLoading = useSubscribe("contacts"); 
    const contacts = useTracker(() => ContactsCollection.find({}).fetch());

    if (isLoading()) {
        return <div>Carregando...</div>;
    }

    return (
        <>

            <h2>Lista de contatos</h2>

            <ul>

                { contacts.map(contact => (
                            <li key={contact._id}> {contact.nome} - {contact.email}</li>
                )) }

            </ul>
        
        </>
    );
}
