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
import { ExclamationCircleIcon } from "@heroicons/react/24/outline";

export default function LoginModal({ open, setOpen }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [genError, setGenError] = useState("");

  const { logIn } = useUserAuth();

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const status = await logIn(email, password);

    if (status === "Invalid email") setEmailError(status);
    else if (status === "Wrong password") setPasswordError(status);
    else if (status !== "SUCCESS") setGenError(status);
    setLoading(false);
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
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 w-5/6 sm:max-w-4xl sm:p-6">
                <div className="p-4 border-2 border-gray-300">
                  <div className="flex justify-center">
                    <h2 className="mt-4 text-3xl font-patrick tracking-wide text-gray-900 text-center">
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
                      <picture>
                        <img
                          className="absolute inset-0 h-full w-full object-cover"
                          src="/loginImage.jpg"
                          alt="Login illustration"
                        />
                      </picture>
                    </div>
                    <div className="flex flex-1 flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-12">
                      <div className="mx-auto w-full lg:w-96">
                        <div>
                          <div className="">
                            <form action="" className="space-y-3">
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
                                <div
                                  className={`flex pt-1 items-center ${
                                    !emailError && "invisible"
                                  }`}
                                >
                                  <ExclamationCircleIcon
                                    className="h-5 w-5 text-red-500"
                                    aria-hidden="true"
                                  />
                                  <div className="flex items-center pl-1 h-4 text-sm text-red-400 font-nunito font-bold">
                                    {emailError}
                                  </div>
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
                                    onChange={(e) =>
                                      setPassword(e.target.value)
                                    }
                                    autoComplete="current-password"
                                    required
                                    className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-hazelnut focus:outline-none focus:ring-hazelnut sm:text-sm"
                                  />
                                </div>
                                <div
                                  className={`flex pt-1 items-center ${
                                    !passwordError && "invisible"
                                  }`}
                                >
                                  <ExclamationCircleIcon
                                    className="h-5 w-5 text-red-500"
                                    aria-hidden="true"
                                  />
                                  <div className="flex items-center pl-1 h-4 text-sm text-red-400 font-nunito font-bold">
                                    {passwordError}
                                  </div>
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
                                  type="submit"
                                  onClick={handleSubmit}
                                  className="flex w-full justify-center rounded-md border border-transparent bg-chrome-yellow py-2 px-4 text-lg font-medium text-white shadow-sm hover:opacity-75 focus:outline-none focus:ring-2 focus:ring-hazelnut focus:ring-offset-2 disabled:opacity-40"
                                  disabled={loading}
                                >
                                  {loading ? (
                                    <div className="flex items-center">
                                      <svg
                                        role="status"
                                        className="inline mr-3 w-4 h-4 text-white animate-spin"
                                        viewBox="0 0 100 101"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                      >
                                        <path
                                          d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                          fill="#E5E7EB"
                                        />
                                        <path
                                          d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                          fill="currentColor"
                                        />
                                      </svg>
                                      LOGGING IN...
                                    </div>
                                  ) : (
                                    "SIGN IN"
                                  )}
                                </button>
                                <div
                                  className={`flex pt-2 items-center ${
                                    !genError && "invisible"
                                  }`}
                                >
                                  <ExclamationCircleIcon
                                    className="h-5 w-5 text-red-500"
                                    aria-hidden="true"
                                  />
                                  <div className="flex items-center pl-1 h-4 text-sm text-red-400 font-nunito font-bold">
                                    {genError}
                                  </div>
                                </div>
                              </div>
                            </form>
                          </div>
                          <div className="relative mt-3">
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
                          <div className="flex justify-center pt-3">
                            <button
                              onClick={handleGoogleLogin}
                              type="button"
                              className="text-gray-700 outline-gray bg-white hover:bg-white/90 focus:ring-4 focus:outline-none focus:ring-white/50 font-medium font-nunito rounded-lg text-lg px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#4285F4]/55 mb-2"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-6 h-6"
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
                              <p className="hidden sm:flex sm:pl-3">
                                Sign in with Google
                              </p>
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
