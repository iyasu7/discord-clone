import logo from "../assets/App_logo.png";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { redirect } from "react-router-dom";
import { auth, db } from "../firebase";
import { ServerIcon } from "./ServerIcon";
import {
  ChevronDownIcon,
  CogIcon,
  MicrophoneIcon,
  PhoneIcon,
  PlusIcon,
} from "@heroicons/react/24/outline";
import { Channel } from "./Channel";
import { collection, addDoc } from "firebase/firestore";

import { useCollection } from "react-firebase-hooks/firestore";
export const Home = () => {
  const [user] = useAuthState(auth);
  const navigateTo = useNavigate();
  const [value, loading, error] = useCollection(collection(db, "channels"), {
    snapshotListenOptions: { includeMetadataChanges: true },
  });

  const loader = async () => {
    if (!user) {
      return redirect("/");
    }
    return null;
  };

  const handleAddChannel = async (e) => {
    e.preventDefault();
    const channelName = prompt("Enter Channel Name");
    if (channelName) {
      try {
        console.log(channelName);
        const docRef = await addDoc(collection(db, "channels"), {
          channelName: channelName,
          state: "CA",
          country: "USA",
        });
        console.log("Document written with ID: ", docRef.id);
      } catch (e) {
        console.error("Error adding document: ", e);
      }
    }
  };
  const signOut = () => {
    auth.signOut();
    redirect("/");
  }
  useEffect(() => {
    loader();
  }, []);

  return (
    <>
    {!user ? navigateTo('/') :
      <div className="flex h-screen">
        <div className="flex flex-col space-y-3 min-w-max p-4 bg-[#202225]">
          <div className="server-default hover:bg-discord_blue">
            <img alt="logo" src={logo} className="h-8 rounded-full"></img>
          </div>
          <hr className="border-gray-300 border w-8 mx-auto" />
          <ServerIcon image="https://rb.gy/qidcpp" />
          <ServerIcon image="https://rb.gy/zxo0lz" />
          <ServerIcon image="https://rb.gy/qidcpp" />
          <ServerIcon image="https://rb.gy/zxo0lz" />
          <div className="server-default hover:bg-discord_green group">
            <PlusIcon className="h-7 text-discord_green group-hover:text-white " />
          </div>
        </div>
        <div className="bg-[#2f3136] flex flex-col min-w-max ">
          <h2 className="flex font-bold justify-center border-b hover:bg[#34373c] border-gray-700 p-4 text-sm items-center cursor-pointer text-white">
            Create a server... <ChevronDownIcon className="h-5" />
          </h2>
          <div className="text-[#889297] flex-grow overflow-y-scroll scrollbar-hide">
            <div className="flex items-center p-2 ">
              <ChevronDownIcon className="h-5 mr-2" />
              <h4>Channels</h4>
              <PlusIcon
                className="h-5 ml-auto cursor-pointer hover:text-white"
                onClick={handleAddChannel}
              />
            </div>
            <div className="flex flex-col px-2 mb-4">
              {value?.docs.map((doc) => (
                <Channel
                  key={doc.id}
                  id={doc.id}
                  channelName={doc.data().channelName}
                  className="mb-14"
                />
              ))}
            </div>
          </div>
          <div className="bg-[#292b2f] p-2 flex justify-between items-center space-x-8">
            <div className="flex items-center space-x-1 p-2">
              <img
                src={user?.photoURL}
                alt=""
                className="h-10 rounded-full "
                onClick={signOut}
              />
              <h4 className="text-white text-sm font-medium">
                {user?.displayName}
                <span className="text-[#b9bbbe] block">
                  {" "}
                  #{user?.uid.substring(0, 4)}
                </span>
              </h4>
            </div>
            <div className="text-gray-400 flex items-center">
              <div className="hover:bg-[#3a3c43] p-2 rounded-lg">
                <MicrophoneIcon className="h-5 icon" />
              </div>
              <div className="hover:bg-[#3a3c43] p-2 rounded-lg">
                <PhoneIcon className="h-5 icon" />
              </div>
              <div className="hover:bg-[#3a3c43] p-2 rounded-lg">
                <CogIcon className="h-5 icon" />
              </div>
            </div>
          </div>
        </div>
      </div>
      }
    </>
  );
};
