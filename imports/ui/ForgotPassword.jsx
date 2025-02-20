import React, { useState } from 'react';
import { useAlert } from 'meteor/quave:alert-react-tailwind';
import { Accounts } from 'meteor/accounts-base';
import { RoutePaths } from './RoutePaths';
import { useNavigate } from 'react-router-dom';
import { ErrorAlert } from './components/ErrorAlert';

export const ForgotPassword = () => {
  // @ts-ignore
  const { openAlert } = useAlert();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [error, setError] = useState("");

  const forgotPassword = (e) => {
    e.preventDefault();
    
    if ( !email || email.length === 0 ) {
      setError("Preencha o campo de email");
      return;
    } else {
      Accounts.forgotPassword({ email }, (errorResponse) => {
        if (errorResponse) {
          console.error(
            'Erro ao enviar o link de redefinação da senha',
            errorResponse
          );
          setError(errorResponse.message);
          return;
        }
        setEmail('');
        setError(null);
        openAlert('Você deve receber um email em breve!');
      });
    }
  };

  return (
    <div className="flex flex-col items-center">
      <h3 className="px-3 py-2 text-lg text-base font-medium">
        Esqueci a Senha
      </h3>
      {error && <ErrorAlert message={error. // @ts-ignore
      message || 'Erro desconhecido'} />}
      <form className="mt-6 flex flex-col">
        <div className="flex flex-col space-y-4">
          <div className="">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
            />
          </div>
        </div>
        <div className="flex justify-center py-3">
          <button
            onClick={() => navigate(RoutePaths.ACCESS)}
            className="inline-flex  justify-center rounded-md border border-gray-300 py-2 px-4 text-sm font-medium text-black shadow-sm hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2"
          >
            Retornar ao login
          </button>

          <button
            onClick={forgotPassword}
            type="submit"
            className="ml-3 inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2"
          >
            Mandar link de verificação
          </button>
        </div>
      </form>
    </div>
  );
};