import React, { useState } from 'react';
import { Modal } from "./components/Modal";
import { SelectContact } from './components/SelectContact';
import { ContactsCollection } from '../api/Contacts/ContactsCollection';
import { useSubscribe, useFind } from "meteor/react-meteor-data";
import { Loading } from './components/Loading';
import { WalletsCollection } from '../api/Wallets/WalletsCollection';


export const Wallet = () => {
  const [open, setOpen] = useState(false);
  const [isTransfering, setIsTransfering] = useState(false);
  const [amount, setAmount] = React.useState(0);
  const [destinationWallet, setDestinationWallet] = useState({});
  const [errorMessage, setErrorMessage] = useState("");

  const isLoadingContacts = useSubscribe("contacts.active");
  const isLoadingWallets = useSubscribe("wallets");

  const contacts = useFind(() =>
    ContactsCollection.find(
      { archived: { $ne: true } },
      { sort: { createdAt: -1 } }
    )
  );

  const [wallet] = useFind(() => WalletsCollection.find());

  const resetForm = () => {
    setAmount(0);
    setDestinationWallet({});
    setErrorMessage("");
  };

  const addTransaction = async () => {
    await Meteor.callAsync ( 'transactions.insert', { data : { isTransfering, sourceWalletId: wallet._id, destinationWalletId: destinationWallet['walletId'] || "", amount } }).then( () => {
        setOpen(false);
    }).catch( ( errorResponse ) => {

        if ( errorResponse.reason ){
          setErrorMessage ( errorResponse.reason );
        }

        setErrorMessage ( errorResponse.details[0].message );
    } )
  };

  if (isLoadingContacts() || isLoadingWallets() ) {
    return <Loading/>
  }

  return (
    <>
      <div className="flex font-sans shadow-md my-10">
        <form className="flex-auto p-6">
          <div className="flex flex-wrap">
            <div className="w-full flex-none text-sm font-medium text-gray-500">
              Conta Principal
            </div>
            <div className="w-full flex-none text-sm font-medium text-gray-500 mt-2">
              ID da Carteira:
            </div>
            <h1 className="flex-auto text-lg font-semibold text-gray-700">
              {wallet._id}
            </h1>
            <div className="text-2xl font-bold text-gray-700">{`${wallet.balance} ${wallet.currency}`}</div>
          </div>
          <div className="flex space-x-4 text-sm font-medium">
            <div className="flex-auto flex space-x-4 mt-4">
              <button
                type="button"
                className="bg-indigo-600 border border-transparent rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600"
                onClick={() => {
                  setIsTransfering(false);
                  setOpen(true);
                }}
              >
                Adicionar dinheiro
              </button>
              <button
                type="button"
                className="bg-indigo-600 border border-transparent rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600"
                onClick={() => {
                  setIsTransfering(true);
                  setOpen(true);
                }}
              >
                Transferir dinheiro
              </button>
            </div>
          </div>
        </form>
      </div>

      <Modal
        open={open} 
        setOpen={setOpen} 
        title={isTransfering ? "Transferir dinheiro para outra carteira" : "Adicionar dinheiro à sua carteira"}
        body={
          <>
            {isTransfering && (
              <div className='mt-2'>
                <SelectContact
                  title="Destinatário"
                  contacts={contacts}
                  contact={destinationWallet}
                  setContact={setDestinationWallet}
                  />
              </div>
            )}

            <div className='mt-2'>
              <label
                htmlFor="amount"
                className="block text-sm font-medium text-gray-700"
              >
                Quantidade:
              </label>
              <input
                type="number"
                id="amount"
                value={amount}
                min = {0}
                onChange={(e) => setAmount( Number (e.target.value) )}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="0.00"
              />
            </div>
          </>
        }
          footer={
            <button
              type="button"
              className="bg-indigo-600 border border-transparent rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600"
              onClick={() => {
                addTransaction ();
                resetForm ();
              }}
            >
              {isTransfering ? "Transferir" : "Adicionar"}
            </button>
          }
        errorMessage={errorMessage}
      />
    </>
  );
}
