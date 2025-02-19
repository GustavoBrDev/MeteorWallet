import React, { useState } from 'react';
import { Accounts } from 'meteor/accounts-base';
import { RoutePaths } from './RoutePaths';
import { useNavigate } from 'react-router-dom';
import { ErrorAlert } from './components/ErrorAlert';

export const Acess = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState("");
  const [ isSignUp, setIsSignUp ] = useState(true);

  const signUp = (e) => {
    e.preventDefault();
    Accounts.createUser({ email, password }, (errorResponse) => {
      if (errorResponse) {
        console.error('Error creating user', errorResponse);
        // @ts-ignore
        setError(errorResponse.reason);
        return;
      }
      navigate(RoutePaths.HOME);
    });
  };

  const signIn = (e) => {
    e.preventDefault();
    Meteor.loginWithPassword(email, password, (errorResponse) => {
      if (errorResponse) {
        console.error('Erro ao realizar login', errorResponse);
        // @ts-ignore
        setError(errorResponse.reason);
        return;
      }
      navigate(RoutePaths.HOME);
    });
  };

  return (
    <div className="flex flex-col items-center">
      <h3 className="px-3 py-2 text-lg text-base font-medium">{ isSignUp ? "Cadastrar-se" : "Fazer login"}</h3>
      {error && <ErrorAlert message={error || 'Erro desconhecido'} />}
      <form className="mt-6">
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
              className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
            />
          </div>
        </div>
        <div className="flex justify-center py-3">
          <button
            onClick={() => navigate(RoutePaths.HOME)}
            className="inline-flex  justify-center rounded-md border border-gray-300 py-2 px-4 text-sm font-medium text-black shadow-sm hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2">
            Retornar
          </button>
          { isSignUp && (
              <button
              onClick={signUp}
              type="submit"
              className="ml-3 inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2"
            >
              Cadastrar-se
            </button>
          )}

          { ! isSignUp && (
              <button
              onClick={signIn}
              type="submit"
              className="ml-3 inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2"
            >
              Entrar
            </button>
          )}
        </div>

        <div className="py-3">
          <a
            className="cursor-pointer text-indigo-800"
            onClick={() => setIsSignUp(!isSignUp)}
          >
            {isSignUp
              ? 'Você possui uma conta? Clique aqui'
              : "Não possui uma conta? Crie uma aqui"}
          </a>
        </div>

        { ! isSignUp && (
          <div className="py-3">
            <a
              className="cursor-pointer text-indigo-800"
              onClick={() => navigate(RoutePaths.FORGOT_PASSWORD)}
            >
              Esqueceu sua senha?
            </a>
          </div>
        )}
      </form>
    </div>
  );
};