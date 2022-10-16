import Head from 'next/head';
import {
  handleGoogleLogin,
  createAccount,
  handleEmailLogin,
} from "../services/auth";
import { Header } from '../components/landing-page/Header'
import { Container } from '../components/landing-page/Container'

export default function Home() {
  

  return (
    <div className="flex flex-col h-screen">
      <Header />

      <main className="flex flex-col lg:flex-row flex-grow">
        <div className="flex-1 h-full bg-chrome-yellow">
          <Container>
            <div className="pt-60 inline-block my-auto align-content">
              <h2 className="font-semibold italic font-nunito text-5xl text-white tracking-wide leading-14">
                Never lose or forget your favourite recipes again.
              </h2>
              <p className="font-nunito text-white text-2xl py-8">
                Cooking is now made easy with{" "}
                <span className="font-patrick italic text-hazelnut text-3xl tracking-wide">
                  REcipes
                </span>
                , your cooking companion!
              </p>
              <span className="inline-block text-2xl align-center">
                <button
                  href="/register"
                  className="bg-white hover:opacity-75 text-chrome-yellow px-4 py-2 rounded-lg"
                >
                  <span className="font-nunito font-bold">Register</span>
                </button>
                <span className="text-white font-nunito text-xl pl-2">
                  to store your recipes for free!
                </span>
              </span>
              <p className="font-nunito text-white text-xl py-4">OR</p>
              <button
                onClick={handleGoogleLogin}
                type="button"
                className="text-chestnut bg-white hover:bg-white/90 focus:ring-4 focus:outline-none focus:ring-white/50 font-medium font-nunito rounded-lg text-xl px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#4285F4]/55 mr-2 mb-2"
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
          </Container>
        </div>
        <div className="flex-1 h-full bg-blanched-almond">
          <Container>
            <div className="relative w-full h-full">
              <picture>
                <img
                  className="absolute top-0"
                  src="/kitchen-baking-and-cooking-tool.png"
                  alt="Cooking tools"
                />
              </picture>
              <picture>
                <img
                  className="absolute top-[26.5rem]"
                  src="/kitchen-baking-and-cooking-tool.png"
                  alt="Baking tools"
                />
              </picture>
              <picture>
                <img
                  className="overflow-hidden absolute z-10 top-[20.5rem] left-[6.9rem] scale-[2] block"
                  src="/desktop-prototype.png"
                  alt="Desktop image"
                />
              </picture>
            </div>
          </Container>
        </div>
      </main>
    </div>
  );
}
