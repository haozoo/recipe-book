import { useState } from 'react';
import { ChevronRightIcon } from '@heroicons/react/24/outline';
import {
  footerNavigationOptions,
  sidebarNavigationOptions,
} from "../../utils/constants";
import Link from "next/link";

export default function UserLayout({ children, activePageTitle }) {
  const [sidebarExpanded, setSidebarExpanded] = useState(false);

  return (
    <>
      {/* Sidebar */}
      <div className="fixed inset-y-0 flex w-14 flex-col">
        <div className="flex min-h-0 flex-1 flex-col items-center bg-rajah">
          <div className="flex h-16 flex-shrink-0 items-center mt-4 mb-12">
            <Link href={sidebarNavigationOptions[0].href}>
              <a>
                <img
                  className="h-18 w-18"
                  src="/recipe_logo.png"
                  alt="Workflow"
                />
              </a>
            </Link>
          </div>
          <div className="flex flex-1 flex-col overflow-y-auto">
            <nav className="flex-1 space-y-12 px-3 py-4">
              {sidebarNavigationOptions.map((item) => (
                <Link key={item.id} add href={item.href}>
                  <a className="text-white group flex items-center mx-6 text-sm font-medium">
                    <item.icon className="text-chestnut flex-shrink-0 h-6 w-6" />
                  </a>
                </Link>
              ))}
              <div className="bg-dirt opacity-40 mx-6 my-20 w-6 h-0.5 rounded-xl" />
              <button
                className="text-white group flex items-center mx-6 text-sm font-medium"
                onClick={setSidebarExpanded}
              >
                <ChevronRightIcon className="text-chestnut flex-shrink-0 h-6 w-6" />
              </button>
            </nav>
          </div>
        </div>
      </div>

      {/* Header */}
      <div className="ml-14">
        <div className="sticky top-0 z-10 px-10 sm:px-16 lg:px-16 flex h-24 flex-shrink-0 bg-white border-b-2">
          <div className="flex items-center pt-2">
            <div className="font-patrick font-bold text-chestnut tracking-wide text-3xl">
              {activePageTitle}
            </div>
          </div>
          <div className="flex flex-1 justify-end">
            <div className="flex items-center">
              <Link href="/profile">
                <a className="flex max-w-xs items-center rounded-full bg-white text-sm">
                  <img
                    className="h-12 w-12 rounded-full"
                    src="https://images.unsplash.com/photo-1525351484163-7529414344d8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80"
                    alt=""
                  />
                </a>
              </Link>
            </div>
          </div>
        </div>

        <main className="flex-1">
          <div className="mx-auto max-w-8xl min-h-screen px-10 sm:px-16 lg:px-16 bg-white">
            <main>{children}</main>
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
                  <span className="sr-only">{item.name}</span>
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
    </>
  );
}
