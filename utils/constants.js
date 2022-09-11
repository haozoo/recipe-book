import {
  HomeIcon,
  HeartIcon,
  PlusCircleIcon,
} from "@heroicons/react/24/outline";
import { AuthErrorCodes } from 'firebase/auth';

export const navigationOptions = [
  { id: 1, name: "Home", href: "/recipes", icon: HomeIcon },
  { id: 2, name: "Favourites", href: "/recipes/favourites", icon: HeartIcon },
  { id: 3, name: "Add Recipe", href: "/recipes/add", icon: PlusCircleIcon },
];

export const showLoginError = (error) => {  
  const txtEmail = document.querySelector('#txtEmail');
  const txtPassword = document.querySelector('#txtPassword');
  const divLoginError = document.querySelector('#divLoginError');
  const lblLoginErrorMessage = document.querySelector('#lblLoginErrorMessage');
  if (error.code == AuthErrorCodes.INVALID_PASSWORD) {
    lblLoginErrorMessage.innerHTML = `Wrong password. Try again.`
  }
  else {
    lblLoginErrorMessage.innerHTML = `Error: ${error.message}`      
  }
}