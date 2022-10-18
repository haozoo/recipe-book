import Head from 'next/head';
import { useState } from 'react'
import {
  handleGoogleLogin,
  createAccount,
  handleEmailLogin,
} from "../services/auth";
import { Header } from '../components/landing-page/Header'
import { Container } from '../components/landing-page/Container'
import RegisterModal from "../components/utility/RegisterModal";

export default function Home() {
  const [registerModalIsOpen, setRegisterModalIsOpen] = useState(false);

  return (
    <div className="flex flex-col h-screen">
      <RegisterModal
        open={registerModalIsOpen}
        setOpen={setRegisterModalIsOpen}
      />
      <Head>
        <title>Recipe App</title>
        <meta name="description" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />

      <main className="flex flex-col w-full sm:flex-row h-full">
        <div className="flex h-full w-full md:w-3/5 lg:w-2/5 bg-chrome-yellow z-10 shadow-md shadow-sajah">
          <div className="pt-32 sm:pt-0 pb-32 px-12 md:px-16 lg:px-20 inline-block my-auto align-content">
            <h2 className="font-extrabold font-inter text-4xl sm:text-5xl 2xl:text-6xl text-white tracking-wide leading-16">
              Never lose your{" "}
              <span className="text-white">favourite recipes</span> again.
            </h2>
            <p className="font-nunito font-bold text-floral-white text-xl sm:text-2xl py-8">
              Make cooking easier with{" "}
              <span className="font-patrick font-bold text-yellow-700 text-2xl sm:text-3xl tracking-wide">
                REcipes
              </span>
              , your new cooking companion.
            </p>
            <div className="flex flex-wrap space-x-4 items-center">
              <button
                onClick={() => setRegisterModalIsOpen(true)}
                className="h-12 bg-white px-4 md:px-8 py-2 rounded-md font-nunito font-bold text-base xl:text-lg text-yellow-700 hover:text-yellow-800 shadow-sajah shadow-sm
                hover:bg-orange-100"
              >
                Register
              </button>
              <button
                onClick={handleGoogleLogin}
                type="button"
                className="h-12 text-yellow-700 bg-white hover:opacity-75 focus:ring-white/50 font-bold font-nunito rounded-md text-base xl:text-lg px-4 2xl:px-8 py-2.5 text-center inline-flex items-center shadow-sajah shadow-sm"
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

                <span className="hidden 2xl:flex xl:pl-4">
                  Sign in with Google
                </span>
              </button>
            </div>
          </div>
        </div>
        <div className="hidden sm:flex flex-row-reverse w-full md:w-2/5 lg:w-3/5 bg-blanched-almond">
          <div className="relative left-0 lg:left-12">
            <img
              className="aspect-w-3 aspect-h-4 h-full rounded-lg object-cover"
              src="/sample-app.jpg"
              alt="Sample App"
            />
          </div>
        </div>
      </main>
    </div>
  );
}
