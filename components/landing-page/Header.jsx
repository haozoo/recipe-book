import { Fragment, useState } from 'react'
import Link from 'next/link'
import { Popover, Transition } from '@headlessui/react'

import { Button } from '../../components/landing-page/Button'
import { Container } from '../../components/landing-page/Container'
import { NavLink } from '../../components/landing-page/NavLink'

import LoginModal from "../utility/LoginModal";
import RegisterModal from "../utility/RegisterModal";

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
          <div className="flex items-center gap-x-4 md:gap-x-8">
            <div className="font-nunito font-medium text-sm md:text-base lg:text-lg">
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
        </nav>
      </div>
    </header>
  );
}
