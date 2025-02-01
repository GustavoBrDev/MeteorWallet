import React, { Fragment } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, SelectorIcon } from "@heroicons/react/solid";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export const SelectContact = ({ title, contact, setContact, contacts }) => {
  return (
    <Listbox value={contact} onChange={setContact}>
      {({ open }) => (
        <div className="mt-1 relative">
          <Listbox.Label className="block text-sm font-medium text-gray-700">
            {title}
          </Listbox.Label>
          <div className="relative">
            <Listbox.Button className="relative w-full bg-white border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
              <span className="flex items-center">
              {contact.nome && (
                <img
                  className="h-10 w-10 rounded-full"
                  src={contact.imageUrl || '../../images/usuario.jpg'}
                  onError={(e) => {
                    // @ts-ignore
                    e.target.src = '../../images/usuario.jpg';
                  }}
                  alt=""
                />
              )}
                <span className="ml-3 block truncate">
                  {contact?.nome || "Selecione um contato"}
                </span>
              </span>
              <span className="ml-3 absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                <SelectorIcon
                  className="h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
              </span>
            </Listbox.Button>

            <Transition
              show={open}
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-32 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
                {!contacts.length && (
                  <Listbox.Option
                    value={null}
                    className={classNames(
                      "text-gray-900",
                      "cursor-default select-none relative py-2 pl-3 pr-9"
                    )}
                    disabled={true}
                  >
                    <div className="flex items-center">
                      <span
                        className={classNames(
                          "font-normal",
                          "ml-3 block truncate"
                        )}
                      >
                        Nenhum contato encontrado
                      </span>
                    </div>
                  </Listbox.Option>
                )}

                {contacts.map((contact) => (
                  <Listbox.Option
                    key={contact._id}
                    value={contact}
                    className={({ active }) =>
                      classNames(
                        active ? "text-white bg-indigo-600" : "text-gray-900",
                        "cursor-default select-none relative py-2 pl-3 pr-9"
                      )
                    }
                  >
                    {({ selected, active }) => (
                      <>
                        <div className="flex items-center">
                          <img
                            className="h-10 w-10 rounded-full"
                            src={contact.imageUrl || '../../images/usuario.jpg'}
                            onError={(e) => {
                              // @ts-ignore
                              e.target.src = '../../images/usuario.jpg';
                            }}
                            alt=""
                         />
                          <span
                            className={classNames(
                              selected ? "font-semibold" : "font-normal",
                              "ml-3 block truncate"
                            )}
                          >
                            {contact.nome}
                          </span>
                        </div>

                        {selected ? (
                          <span
                            className={classNames(
                              active ? "text-white" : "text-indigo-600",
                              "absolute inset-y-0 right-0 flex items-center pr-4"
                            )}
                          >
                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </div>
      )}
    </Listbox>
  );
};

