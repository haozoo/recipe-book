import { Fragment, useState } from "react";
import Link from "next/link";
import { Menu, Popover, Transition } from "@headlessui/react";

import { Button } from "./Button";
import { Container } from "./Container";
import { NavLink } from "./NavLink";

import LoginModal from "../utility/LoginModal";
import RegisterModal from "../utility/RegisterModal";
import { Bars3Icon, EllipsisVerticalIcon } from "@heroicons/react/24/outline";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export function Header() {
  const [loginModalIsOpen, setLoginModalIsOpen] = useState(false);
  const [registerModalIsOpen, setRegisterModalIsOpen] = useState(false);

  return (
    <header className="py-1 sm:py-3 z-30 shadow-sm shadow-sajah">
      <div className="px-8 md:px-12 lg:px-16">
        <LoginModal open={loginModalIsOpen} setOpen={setLoginModalIsOpen} />
        <RegisterModal
          open={registerModalIsOpen}
          setOpen={setRegisterModalIsOpen}
        />
        <nav className="relative z-20 flex justify-between">
          <div className="flex items-center md:gap-x-2">
            <Link href="#">
              <picture>
                <img
                  className="h-14 w-14 sm:h-16 sm:w-16"
                  src="/recipe_logo.png"
                  alt="REcipe brand logo"
                />
              </picture>
            </Link>
            <span className="hidden sm:inline-block sm:align-bottom ">
              <span className="font-patrick font-bold text-chestnut tracking-wide text-3xl pr-2">
                REcipes
              </span>
            </span>
          </div>
          <div className="hidden sm:flex items-center gap-x-4 lg:gap-x-8">
            <div className="font-nunito font-semibold text-sm md:text-base text-hazelnut lg:text-lg">
              <button
                className="group flex items-center px-4 py-2"
                onClick={() => setLoginModalIsOpen(true)}
              >
                Sign in
              </button>
            </div>
            <button
              onClick={() => setRegisterModalIsOpen(true)}
              className="font-nunito font-bold text-sm md:text-base lg:text-lg bg-chrome-yellow hover:opacity-75 text-white px-4 py-2 rounded-lg"
            >
              Register
            </button>
          </div>
          <div className="flex items-center sm:hidden">
            <Menu as="div" className="relative inline-block text-left">
              <div>
                <Menu.Button className="flex items-center text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-rajah focus:ring-offset-2 focus:ring-offset-gray-100">
                  <span className="sr-only">Open options</span>
                  <Bars3Icon className="h-8 w-8" aria-hidden="true" />
                </Menu.Button>
              </div>
              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="absolute right-0 z-10 mt-2 w-32 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <div className="py-1">
                    <Menu.Item>
                      {({ active }) => (
                        <button
                          className={classNames(
                            active
                              ? "bg-gray-100 text-gray-900"
                              : "text-gray-700",
                            "block w-full px-4 py-2 text-left text-sm font-nunito font-medium"
                          )}
                          onClick={() => setLoginModalIsOpen(true)}
                        >
                          Log in
                        </button>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <button
                          className={classNames(
                            active
                              ? "bg-gray-100 text-gray-900"
                              : "text-gray-700",
                            "block w-full px-4 py-2 text-left text-sm font-nunito font-medium"
                          )}
                          onClick={() => setRegisterModalIsOpen(true)}
                        >
                          Sign up
                        </button>
                      )}
                    </Menu.Item>
                  </div>
                </Menu.Items>
              </Transition>
            </Menu>
          </div>
        </nav>
      </div>
    </header>
  );
}
