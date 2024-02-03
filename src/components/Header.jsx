import logo from "../assets/App_logo.png";
import { Bars3Icon } from '@heroicons/react/24/outline'

export const Header = () => {
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
        <a className="link">Why</a>
        <a className="link">Nitro</a>
        <a className="link">Safety</a>
        <a className="link">Support</a>
      </div>
      <div className="flex ">
        <button className="bg-white text-xs hover:shadow-2xl md:text-sm py-2 px-4 rounded-full
        hover:text-discord_blurple transition duration-200 ease-in-out whitespace-nowrap font-medium">
          Login
        </button>
        <Bars3Icon className="h-9 text-white cursor-pointer lg:hidden" />
      </div>
    </header>
  );
};
