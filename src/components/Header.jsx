import logo from "../assets/App_logo.png";
import { Bars3Icon } from '@heroicons/react/24/outline'

import { useNavigate  }  from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, provider } from "../firebase";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";

export const Header = () => {
  const [ user ] = useAuthState(auth);
  const navigateTo = useNavigate();

  const signIn = (e) => {
    e.preventDefault();

    signInWithPopup(auth, provider).then((result) => {
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      console.log(token);
      navigateTo("/channels")
    }).catch((err) => console.log(err));
  }

  return (
    <header className="flex justify-between py-4 px-6 items-start bg-discord_blue">
      <a href="#" className="flex items-center  text-2xl text-white">
        <img
          alt=""
          src={logo}
          className="h-8 bg-slate-400 object-contain rounded"
        ></img><span className="pl-2">Janderba</span>
      </a>
      <div className="hidden lg:flex space-x-6 mt-2">
        <a className="link">Download</a>
        <a className="link">Why?</a>
        <a className="link">Nitro</a>
        <a className="link">Safety</a>
        <a className="link">Support</a>
      </div>
      <div className="flex ">
        <button className="bg-white text-xs hover:shadow-2xl md:text-sm py-2 px-4 rounded-full
        hover:text-discord_blurple transition duration-200 ease-in-out whitespace-nowrap font-medium"
        onClick={!user ? signIn : () => navigateTo("/channels")}>
          {!user ? 'Login' : 'Open In Browser' }
        </button>
        <Bars3Icon className="h-9 text-white cursor-pointer lg:hidden" />
      </div>
    </header>
  );
};
