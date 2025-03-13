import { Meteor } from 'meteor/meteor';
import React, { useState } from 'react';
import { useAlert } from 'meteor/quave:alert-react-tailwind';
import { RoutePaths } from './RoutePaths';
import { useNavigate } from 'react-router-dom';
import { ErrorAlert } from './components/ErrorAlert';

export const RemoveTransaction = () => {
  // @ts-ignore
  const { openAlert } = useAlert();
  const navigate = useNavigate();
  const [transactionId, setTransactionId] = useState('');
  const [error, setError] = useState('');

  const removeTransaction = (e) => {
    e.preventDefault();
    Meteor.call('transactions.remove', transactionId, (err) => {
      if (err) {
        console.error('Erro ao remover a transação', err);
        setError(err);
        return;
      }
      setTransactionId('');
      setError(null);
      openAlert('Transação removida com sucesso!');
    });
  };

  return (
    <div className="flex flex-col items-center">
      <h3 className="px-3 py-2 text-lg font-medium">
        Remover a Transação
      </h3>
      {error && <ErrorAlert message={error. // @ts-ignore
reason || 'Erro desconhecido'} />}
      <form className="flex flex-col mt-6">
        <div className="flex flex-col space-y-4">
          <div className="">
            <label
              htmlFor="transactionId"
              className="block text-sm font-medium text-gray-700"
            >
              ID da Transação
            </label>
            <input
              id="transactionId"
              value={transactionId}
              onChange={(e) => setTransactionId(e.target.value)}
              className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
            />
          </div>
        </div>
        <div className="flex justify-center py-3">
          <button
            onClick={() => navigate(RoutePaths.HOME)}
            className="inline-flex justify-center px-4 py-2 text-sm font-medium text-black border border-gray-300 rounded-md shadow-sm hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2"
          >
            Voltar ao Home
          </button>

          <button
            onClick={removeTransaction}
            type="submit"
            className="inline-flex justify-center px-4 py-2 ml-3 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2"
          >
            Remover
          </button>
        </div>
      </form>
    </div>
  );
};