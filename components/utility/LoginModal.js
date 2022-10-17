import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import {
    handleGoogleLogin,
    handleEmailLogin,
  } from "../../services/auth";
import {
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { useUserAuth } from "../../context/UserAuthContext";
import { showLoginError } from "../../utils/constants";

export default function LoginModal({ open, setOpen }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { logIn } = useUserAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await logIn(email, password);
    } catch (err) {
      console.log(err);
    }
  };
  
  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-30" onClose={setOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-4xl sm:p-6">
                <div className="p-4 border-2 border-chestnut">
                  <div className="flex justify-center">
                    <h2 className="mt-4 text-3xl font-patrick tracking-wide text-gray-900">
                      Welcome back to REcipes!
                    </h2>
                  </div>
                  <div className="absolute top-0 right-0 hidden pt-12 pr-12 sm:block">
                    <button
                      type="button"
                      className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-hazelnut focus:ring-offset-2"
                      onClick={() => setOpen(false)}
                    >
                      <span className="sr-only">Close</span>
                      <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>
                  <div className="flex min-h-full">
                    <div className="relative hidden w-0 flex-1 lg:block">
                      <img
                        className="absolute inset-0 h-full w-full object-cover"
                        src="/loginImage.jpg"
                        alt=""
                      />
                    </div>
                    <div className="flex flex-1 flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-12">
                      <div className="mx-auto w-full lg:w-96">
                        <div>
                          <div id="divLoginError" className="group">
                            <div id="lblLoginErrorMessage" className="errorlabel"></div>

                          </div>
                          <div className="mt-6">
                            <form action="#" method="POST" className="space-y-6">
                              <div>
                                <label
                                  htmlFor="email"
                                  className="block text-sm font-medium text-gray-700"
                                >
                                  Email address
                                </label>
                                <div className="mt-1">
                                  <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    autoComplete="email"
                                    required
                                    className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-hazelnut focus:outline-none focus:ring-hazelnut sm:text-sm"
                                  />
                                </div>
                              </div>

                              <div className="space-y-1">
                                <label
                                  htmlFor="password"
                                  className="block text-sm font-medium text-gray-700"
                                >
                                  Password
                                </label>
                                <div className="mt-1">
                                  <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    autoComplete="current-password"
                                    required
                                    className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-hazelnut focus:outline-none focus:ring-hazelnut sm:text-sm"
                                  />
                                </div>
                              </div>

                              {/* <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                  <input
                                    id="remember-me"
                                    name="remember-me"
                                    type="checkbox"
                                    className="h-4 w-4 rounded border-gray-300 text-chrome-yellow focus:ring-indigo-500"
                                  />
                                  <label
                                    htmlFor="remember-me"
                                    className="ml-2 block text-sm text-gray-900"
                                  >
                                    Remember me
                                  </label>
                                </div>

                                <div className="text-sm">
                                  <a
                                    href="#"
                                    className="font-medium text-chrome-yellow hover:text-indigo-500"
                                  >
                                    Forgot your password?
                                  </a>
                                </div>
                              </div> */}

                              <div>
                                <button
                                  type="button"
                                  onClick={handleEmailLogin}
                                  className="flex w-full justify-center rounded-md border border-transparent bg-chrome-yellow py-2 px-4 text-lg font-medium text-white shadow-sm hover:opacity-75 focus:outline-none focus:ring-2 focus:ring-hazelnut focus:ring-offset-2"
                                >
                                  SIGN IN
                                </button>
                              </div>
                            </form>
                          </div>
                          <div className="relative mt-6">
                            <div
                              className="absolute inset-0 flex items-center"
                              aria-hidden="true"
                            >
                              <div className="w-full border-t border-gray-300" />
                            </div>
                            <div className="relative flex justify-center text-sm">
                              <span className="bg-white px-2 text-gray-500">
                                OR
                              </span>
                            </div>
                          </div>
                          <div className="flex justify-center">
                            <button
                              onClick={handleGoogleLogin}
                              type="button"
                              className="text-gray-700 outline-gray bg-white hover:bg-white/90 focus:ring-4 focus:outline-none focus:ring-white/50 font-medium font-nunito rounded-lg text-lg px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#4285F4]/55 mr-2 mb-2"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="mr-2 -ml-1 w-6 h-6"
                                aria-hidden="true"
                                focusable="false"
                                data-icon="google"
                                role="img"
                                viewBox="0 0 512 512"
                              >
                                <path
                                  fill="#fbbb00"
                                  d="M113.47 309.408 95.648 375.94l-65.139 1.378C11.042 341.211 0 299.9 0 256c0-42.451 10.324-82.483 28.624-117.732h.014L86.63 148.9l25.404 57.644c-5.317 15.501-8.215 32.141-8.215 49.456.002 18.792 3.406 36.797 9.651 53.408z"
                                />
                                <path
                                  fill="#518ef8"
                                  d="M507.527 208.176C510.467 223.662 512 239.655 512 256c0 18.328-1.927 36.206-5.598 53.451-12.462 58.683-45.025 109.925-90.134 146.187l-.014-.014-73.044-3.727-10.338-64.535c29.932-17.554 53.324-45.025 65.646-77.911h-136.89V208.176h245.899z"
                                />
                                <path
                                  fill="#28b446"
                                  d="m416.253 455.624.014.014C372.396 490.901 316.666 512 256 512c-97.491 0-182.252-54.491-225.491-134.681l82.961-67.91c21.619 57.698 77.278 98.771 142.53 98.771 28.047 0 54.323-7.582 76.87-20.818l83.383 68.262z"
                                />
                                <path
                                  fill="#f14336"
                                  d="m419.404 58.936-82.933 67.896C313.136 112.246 285.552 103.82 256 103.82c-66.729 0-123.429 42.957-143.965 102.724l-83.397-68.276h-.014C71.23 56.123 157.06 0 256 0c62.115 0 119.068 22.126 163.404 58.936z"
                                />
                              </svg>
                              Sign in with Google
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
