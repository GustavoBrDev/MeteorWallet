import { Meteor } from 'meteor/meteor';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { RoutePaths } from './RoutePaths';
import { useLoggedUser } from 'meteor/quave:logged-user-react';

export const Header = () => {
  const navigate = useNavigate();
  const { loggedUser, isLoadingLoggedUser } = useLoggedUser();
  return (
    <header className="bg-indigo-600">
      <nav className="max-w-5xl px-4 mx-auto sm:px-6 lg:px-8" aria-label="Top">
        <div className="flex items-center justify-between w-full py-6 border-b border-indigo-500 lg:border-none">
          <div className="flex items-center justify-between grow">
            <div>
              <a
                className="cursor-pointer"
                onClick={() => navigate(RoutePaths.HOME)}
              >
                <span className="sr-only">Meteor Wallet</span>
                <img className="w-auto h-10" src="/images/logo.png" alt="" />
              </a>
            </div>
            <div>
              { !isLoadingLoggedUser && !loggedUser && (
                <button
                  className="font-bold text-white"
                  onClick={() => navigate(RoutePaths.ACESS)}
                >
                  Cadastrar-se
                </button>
              )}
              { ! isLoadingLoggedUser && loggedUser && (
                <button
                  className="font-bold text-white"
                  onClick={() => Meteor.logout()}
                >
                  Sair
                </button>
              )}
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};
