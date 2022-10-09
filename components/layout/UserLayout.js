import { useState, Fragment, useEffect } from "react";
import { ChevronRightIcon, UserIcon } from "@heroicons/react/24/outline";
import {
  AUTH_LOGIN_PATH,
  footerNavigationOptions,
  LANDING_PAGE_PATH,
  sidebarNavigationOptions,
  USER_PROFILE_PATH,
} from "../../utils/constants";
import Link from "next/link";
import { useUserAuth } from "../../context/UserAuthContext";
import Router from "next/router";
import { Menu, Transition } from "@headlessui/react";
import { RecipeContextProvider } from "../../context/RecipeContext";

const ProfileIcon = ({ user, handleLogOut }) => {
  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="flex max-w-10 pt-2 items-center rounded-full bg-white text-sm">
          <img
            className="h-8 w-8 sm:h-12 sm:w-12 rounded-full"
            src={
              user?.photoURL
                ? user?.photoURL
                : "https://images.unsplash.com/photo-1525351484163-7529414344d8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80"
            }
            alt=""
            aria-hidden="true"
            data-noaft=""
          />
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
        <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-md ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="px-4 py-3 font-nunito">
            <p className="text-sm text-stone-700 font-semibold">Signed in as</p>
            <p className="truncate text-sm font-extrabold text-chestnut">
              {user?.email}
            </p>
          </div>
          <div className="py-1 hover:bg-floral-white hover:text-chestnut">
            <Menu.Item>
              <Link href={USER_PROFILE_PATH}>
                <a className="block px-4 py-2 text-stone-700 text-sm font-nunito font-semibold">
                  Account Settings
                </a>
              </Link>
            </Menu.Item>
          </div>
          <div className="py-1 hover:bg-floral-white hover:text-chestnut">
            <Menu.Item>
              <button
                onClick={handleLogOut}
                className="block w-full px-4 py-2 text-left text-stone-700 text-sm font-nunito font-medium"
              >
                Sign out
              </button>
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default function UserLayout({ children, activePageTitle }) {
  const [sidebarExpanded, setSidebarExpanded] = useState(false);

  const { user, logOut } = useUserAuth();

  useEffect(() => {
    if (!user) Router.push(LANDING_PAGE_PATH);
  }, [user]);

  return (
    <RecipeContextProvider>
      {/* Sidebar */}
      <div className="fixed inset-y-0 flex w-14 sm:w-16 flex-col">
        <div className="flex min-h-0 flex-1 flex-col items-center bg-rajah">
          <div className="flex h-16 flex-shrink-0 items-center mt-4 mb-12">
            <Link href={sidebarNavigationOptions[0].href}>
              <a>
                <img
                  className="h-18 w-18 sm:p-1"
                  src="/recipe_logo.png"
                  alt="Workflow"
                />
              </a>
            </Link>
          </div>
          <div className="flex flex-1 flex-col overflow-y-auto">
            <nav className="flex-1 space-y-12 sm:space-y-14 px-3 py-4">
              {sidebarNavigationOptions.map((item) => (
                <Link key={item.id} add href={item.href}>
                  <a className="text-white group flex items-center mx-6 text-sm font-medium">
                    <item.icon
                      className="text-hazelnut flex-shrink-0 h-6 w-6 sm:h-8 sm:w-8
                     hover:text-orange-200"
                    />
                  </a>
                </Link>
              ))}
              <div className="sm:hidden bg-dirt opacity-40 mx-6 my-20 w-6 h-0.5 rounded-xl" />
              <Link add href={USER_PROFILE_PATH}>
                <a className="sm:hidden text-white group flex items-center mx-6 text-sm font-medium ">
                  <UserIcon className="text-hazelnut flex-shrink-0 h-6 w-6 sm:h-8 sm:w-8" />
                </a>
              </Link>

              {/* <button
                className="text-white group flex items-center mx-6 text-sm font-medium"
                onClick={setSidebarExpanded}
              >
                <ChevronRightIcon className="text-chestnut flex-shrink-0 h-6 w-6 sm:h-8 sm:w-8" />
              </button> */}
            </nav>
          </div>
        </div>
      </div>

      {/* Header */}
      <div className="ml-14 sm:ml-16">
        <div className="sticky top-0 z-10 px-10 sm:px-16 lg:px-16 flex h-24 flex-shrink-0 bg-white border-b-2">
          <div className="flex items-center pt-2">
            <div className="font-patrick font-bold text-chestnut tracking-wide text-2xl sm:text-3xl">
              {activePageTitle}
            </div>
          </div>
          <div className="hidden sm:flex sm:flex-1 sm:justify-end">
            <div className="flex items-center pt-1">
              <ProfileIcon user={user} handleLogOut={logOut} />
            </div>
          </div>
        </div>

        <main className="flex-1">
          <div className="mx-auto max-w-8xl min-h-screen px-10 sm:px-16 lg:px-16 bg-white">
            <main>{user && children}</main>
          </div>
        </main>
        <footer className="sticky-bottom border-t border-gray-200 bg-white mt-16 px-10 sm:px-16 lg:px-16">
          <div className="py-8 flex items-center justify-between">
            <div className="flex space-x-6 order-2">
              {footerNavigationOptions.map((item) => (
                <a
                  key={item.name}
                  href="https://github.com/haozoo/recipe-book"
                  className="text-gray-400 hover:text-gray-500"
                >
                  <item.icon className="h-6 w-6" aria-hidden="true" />
                </a>
              ))}
            </div>
            <p className="mt-0 text-base text-gray-400 font-patrick font-medium tracking-wide order-1">
              &copy; 2022 IT Project Group 80.
            </p>
          </div>
        </footer>
      </div>
    </RecipeContextProvider>
  );
}
