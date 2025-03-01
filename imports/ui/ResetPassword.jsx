// @ts-nocheck
import React, { useState } from 'react';
import { useAlert } from 'meteor/quave:alert-react-tailwind';
import { Accounts } from 'meteor/accounts-base';
import { RoutePaths } from './RoutePaths';
import { useNavigate, useParams } from 'react-router-dom';
import { ErrorAlert } from './components/ErrorAlert';

export const ResetPassword = () => {
  const { openAlert } = useAlert();
  const navigate = useNavigate();
  const { token } = useParams('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState("");

  const resetPassword = (e) => {
    e.preventDefault();
    
    Accounts.resetPassword({ token, password }, (errorResponse) => {
      if (errorResponse) {
        console.error('Erro ao redefinir a senha',errorResponse);
        setError ( errorResponse.reason || "Erro desconhecido");
        return;
      }
      setPassword('');
      setError("");
      openAlert('Sua senha foi alterada!');
      navigate(RoutePaths.ACESS);
    });
  };

  return (
    <div className="flex flex-col items-center">
      <h3 className="px-3 py-2 text-lg font-medium">
        Redefina sua senha
      </h3>
      {error && <ErrorAlert message={error.reason || 'Unknown error'} />}
      <form className="flex flex-col mt-6">
        <div className="flex flex-col space-y-4">
          <div className="">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Senha
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
            />
          </div>
        </div>
        <div className="flex justify-center py-3">
          <button
            onClick={() => navigate(RoutePaths.HOME)}
            className="inline-flex justify-center px-4 py-2 text-sm font-medium text-black border border-gray-300 rounded-md shadow-sm hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2"
          >
            Voltar para Home
          </button>

          <button
            onClick={resetPassword}
            type="submit"
            className="inline-flex justify-center px-4 py-2 ml-3 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2"
          >
            Definir nova senha
          </button>
        </div>
      </form>
    </div>
  );
};