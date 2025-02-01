import React, { useState } from "react";
import { ErrorAlert } from "./components/ErrorAlert";
import { SuccessAlert } from "./components/SucessAlert";

export const ContactForm = () => {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [ error, setError ] = useState("");
  const [ sucess, setSucess ] = useState("");
  const [walletId, setWalletId] = useState("");

  const showError = ( { errorResponse } ) => {
    setError ( errorResponse.reason );
    setTimeout(() => setError(""), 5000);
  }

  const showSucess =  ( { sucess } ) => {
    setSucess( sucess );
    setTimeout(() => setSucess(""), 5000);
  }  

  const saveContact = async () => {
    await Meteor.callAsync( 'contacts.insert', { nome, email, imageUrl, walletId }).then( () => {
        setNome("");
        setEmail("");
        setImageUrl("");
        setWalletId("");
        showSucess ( { sucess: "Contato salvo com sucesso!" } );
      }
    ).catch( ( errorResponse ) => {
        showError ( { errorResponse } )
      }
    )
  
  };

  return (
    <form className="mt-6">
      { error && <ErrorAlert message={error} /> }
      { sucess && <SuccessAlert message={sucess} /> }
      <div className="grid grid-cols-6 gap-6">
        <div className="col-span-6 sm:col-span-6 lg:col-span-2">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Nome
          </label>
          <input
            type="text"
            id="name"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>

        <div className="col-span-6 sm:col-span-3 lg:col-span-2">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>

        <div className="col-span-6 sm:col-span-3 lg:col-span-2">
          <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-700">
            URL da imagem
          </label>
          <input
            type="text"
            id="imageUrl"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>

        <div className="col-span-6">
          <label
            htmlFor="walletId"
            className="block text-sm font-medium text-gray-700"
          >
            ID da Carteira: 
          </label>
          <input
            type="text"
            id="walletId"
            value={walletId}
            onChange={(e) => setWalletId(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
      </div>
      <div className="px-2 py-3 text-right">
        <button
          type="button"
          onClick={saveContact}
          className="bg-indigo-600 border border-transparent rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600"
        >
          Salvar contato
        </button>
      </div>
    </form>
  );
};