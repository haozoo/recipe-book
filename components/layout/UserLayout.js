import { useState } from "react";
import { ChevronRightIcon } from "@heroicons/react/24/outline";
import { navigationOptions } from "../../utils/constants";
import Link from "next/link";

export default function UserLayout({ children, pageName }) {
  const [sidebarExpanded, setSidebarExpanded] = useState(false);

  return (
    <>
      {/* Sidebar */}
      <div className="fixed inset-y-0 flex w-14 flex-col">
        <div className="flex min-h-0 flex-1 flex-col items-center bg-rajah">
          <div className="flex h-16 flex-shrink-0 items-center my-8">
            <img className="h-18 w-18" src="/brown_logo.png" alt="Workflow" />
          </div>
          <div className="flex flex-1 flex-col overflow-y-auto">
            <nav className="flex-1 space-y-12 px-3 py-4">
              {navigationOptions.map((item) => (
                <Link href={item.href}>
                  <a
                    key={item.id}
                    className="text-white group flex items-center mx-6 text-sm font-medium"
                  >
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
        <div className="sticky top-0 z-10 px-10 sm:px-16 lg:px-16 pt-8 flex h-24 flex-shrink-0 bg-white">
          <div className="flex items-center">
            <div className="font-patrick font-bold text-chestnut tracking-wide text-4xl">
              REcipes
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
          <div className="mx-auto max-w-8xl px-10 sm:px-16 lg:px-16 bg-white">
            <main>{children}</main>
          </div>
        </main>
      </div>
    </>
  );
}
