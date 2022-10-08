import { Fragment, useState } from 'react'
import Link from 'next/link'
import { Popover, Transition } from '@headlessui/react'

import { Button } from '../../components/landing-page/Button'
import { Container } from '../../components/landing-page/Container'
import { NavLink } from '../../components/landing-page/NavLink'

import LoginModal from "../utility/LoginModal";

export function Header() {
  const [loginModalIsOpen, setLoginModalIsOpen] = useState(false);

  return (
    
    <header className="py-4">
      <Container>
        <LoginModal
          open={loginModalIsOpen}
          setOpen={setLoginModalIsOpen}
        />
        <nav className="relative z-50 flex justify-between">
          <div className="flex items-center md:gap-x-2">
            <Link href="#">
              <img
                  className="h-16 w-16"
                  src="/recipe_logo.png"
              />
            </Link>
            <span className='inline-block align-bottom'>
              <span className="font-patrick text-chestnut tracking-wide text-3xl pr-2">
                REcipes
              </span>
              <span className="font-nunito text-chestnut tracking-wide text-lg hidden lg:inline-block">
                | YOUR COOKING COMPANION
              </span>
            </span>
          </div>
          <div className="flex items-center gap-x-4 md:gap-x-8">
            <div className="font-nunito text-lg">
              <button
                className="group flex items-center px-4 py-2 text-sm font-nunito font-semibold"
                onClick={() => setLoginModalIsOpen(true)}
              >
                Sign in
              </button>
            </div>
            <button href="/register" color="blue" className="bg-chrome-yellow hover:opacity-75 text-white px-4 py-2 rounded-full">
              <span className='font-nunito text-lg'>
                Register
              </span>
            </button>
          </div>
        </nav>
      </Container>
    </header>
  )
}
