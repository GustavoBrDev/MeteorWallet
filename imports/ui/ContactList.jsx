import React, { useState, useMemo } from "react";
import { ContactsCollection } from "../api/Contacts/ContactsCollection";
import { useSubscribe, useFind } from "meteor/react-meteor-data";
import { ErrorAlert } from "./components/ErrorAlert";
import { SuccessAlert } from "./components/SucessAlert";
import { Loading } from "./components/Loading";

export const ContactList = () => {

    const isLoading = useSubscribe("contacts.active"); 
    const contacts = useFind(() => ContactsCollection.find({ archived: { $ne: true } }, { sort: {createdAt: -1}}) );
    const memorizedContacts = useMemo(() => contacts, [contacts]);
        
    const [ error, setError ] = useState("");
    const [ sucess, setSucess ] = useState("");

    const archiveContact = async (event, _id) => {
      event.preventDefault();
      await Meteor.callAsync('contacts.archive', { contactId: _id }).then(() => {
        showSucess ( { sucess: "Contato arquivado com sucesso!" } );
      }).catch( ( errorResponse ) => {
          showError ( { errorResponse } )
        }
      )
      
    }

    const showError = ( { errorResponse } ) => {
      setError ( errorResponse.error );
      setTimeout(() => setError(""), 5000);
    }
  
    const showSucess =  ( { sucess } ) => {
      setSucess( sucess );
      setTimeout(() => setSucess(""), 5000);
    }

    const ContactItem = ({ contact }) => {
        return (
          <li className="py-4 flex items-center justify-between space-x-3">
                  <div className="min-w-0 flex-1 flex items-center space-x-3">
                    <div className="flex-shrink-0">
                        <img className="h-10 w-10 rounded-full" src={contact.imageUrl || '/images/usuario.jpg'} onError={(e) => {
                            // @ts-ignore
                            e.target.src = '/images/usuario.jpg';
                        }} alt="" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium text-gray-900 truncate">{contact.nome}</p>
                      <p className="text-sm font-medium text-gray-500 truncate">{contact.email}</p>
                      <p className="text-sm font-medium text-gray-500 truncate">{contact.walletId}</p>
                    </div>

                    <div>

                      <a href="#" onClick={(event) => archiveContact(event, contact._id)}
                        className="inline-flex items-center shadow-sm px-2.5 py-0.5 border border-gray-300 text-sm leading-5 font-medium rounded-full text-gray-700 bg-white hover:bg-gray-50">
                        Arquivar
                      </a>

                    </div>

                  </div>
                </li>
        )
    }
    
    if (isLoading()) {
       return <Loading/>
    }

    return (
        <div>
          <div className="mt-10">
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
              Lista de contatos
            </h3>
            <ul role="list" className="mt-4 border-t border-b border-gray-200 divide-y divide-gray-200">
      
            {memorizedContacts.map((contact) => (
            <ContactItem key={contact._id} contact={contact} />
            ))}

            </ul>
          </div>
          { error && <ErrorAlert message={error} /> }
          { sucess && <SuccessAlert message={sucess} /> }
        </div>
        
      )
}
