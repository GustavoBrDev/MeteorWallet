import React from "react";
import { Wallet } from "./Wallet";
import { ContactForm } from "./ContactForm";
import { ContactList } from "./ContactList";
import { useLoggedUser } from 'meteor/quave:logged-user-react';
import { Loading } from "./components/Loading";
import { useNavigate } from 'react-router-dom';
import { RoutePaths } from "./RoutePaths";

export const Home = () => {
    const { loggedUser, isLoadingLoggedUser } = useLoggedUser();
    const navigate = useNavigate();

    if ( isLoadingLoggedUser ) {
        return (
            <Loading/>
        );
    }

    if ( !loggedUser ) {
        return (
            <div className="flex flex-col items-center p-12">
            <div>Bem vindo!</div>
            <div>
              Por favor {' '}
              <a
                className="text-indigo-800 cursor-pointer"
                onClick={() =>  navigate(RoutePaths.ACESS)}
              >
                Entre no sistema
              </a>
              .
            </div>
          </div>
        );
    }
    
    return (
        <>
            <Wallet/>
            <ContactForm />
            <ContactList />
        </>

    )
}