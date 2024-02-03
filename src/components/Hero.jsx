import { ArrowDownTrayIcon } from "@heroicons/react/24/outline";
export const Hero = () => {
  return (
    <div className="bg-discord_blue pb-8 md:p-0">
      <div className="p-7 py-9 h-screen md:h-[89.5vh] overflow-hidden md:flex relative ">
        <div
          className=" flex flex-col gap-7 md:max-md lg:max-w-none
        lg:justify-center"
        >
          <h1 className="text-5xl text-white font-bold">
            Your Place To Talk!
          </h1>
          <h2 className="text-white text-lg font-light tracking-wide md:max-w-lg lg:max-w-3xl w-full">
            Do adipisicing occaecat ad ad minim magna incididunt. Anim excepteur
            laborum velit nulla esse nisi fugiat.
          </h2>
          <div
            className=" flex flex-col sm:flex-row md:flex-col lg:flex-row
          md:items-start sm:items-center gap-6"
          >
            <button className="bg-white w-60 font-medium flex items-center justify-center rounded-full p-3 text-lg hover:shadow-2xl hover:text-discord_blue transition duration-700 ease-in-out">
              <ArrowDownTrayIcon className="h-9" />
              Download for Mac
            </button>
            <button className="bg-gray-900 text-white w-72 font-medium flex items-center justify-center rounded-full p-3 text-lg hover:shadow-2xl hover:bg-gray-800 transition duration-700 ease-in-out">
              Open Discord in your browser
            </button>
          </div>
        </div>
        <div>
          <img
            src="src\assets\man-sitting-on-the-roof.svg"
            alt="men-talking"
            className="absolute overflow-hidden -left-36 mt-16 sm:-left-44 md:hidden"
          />
          <img
            src="src\assets\men-talking.svg"
            alt="Man on a roof reading"
            className="hidden md:inline absolute"
          />
        </div>
      </div>
    </div>
  );
};
