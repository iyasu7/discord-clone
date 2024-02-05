import {
  BellIcon,
  ChatBubbleOvalLeftEllipsisIcon,
  HashtagIcon,
  InboxIcon,
  MagnifyingGlassIcon,
  QuestionMarkCircleIcon,
  UsersIcon,
  PlusCircleIcon,
  FaceSmileIcon,
  GiftIcon,
} from "@heroicons/react/24/solid";
import { useSelector } from "react-redux";
import { selectChannelId, selectChannelName } from "../features/channelSlice";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../firebase";
import { useCollection } from "react-firebase-hooks/firestore";
import { useRef } from "react";
import { doc, collection, addDoc, serverTimestamp, orderBy  } from "firebase/firestore";
import { Message } from "./Message";

export const Chat = () => {
  const channelId = useSelector(selectChannelId);
  const channelName = useSelector(selectChannelName);
  const [user] = useAuthState(auth);
  const inputRef = useRef("");
  const chatRef = useRef(null);
  const [messages] = useCollection(
    channelId && collection(doc(db, "channels", channelId), "messages"),
    orderBy("timestamp", "asc")
  );

  const sendMessage = async (e) => {
    e.preventDefault();

    if (inputRef.current.value !== "") {
      try {
        const messageRef = await addDoc(
          collection(doc(db, "channels", channelId), "messages"),
          {
            timestamp: serverTimestamp(),
            message: inputRef.current.value,
            name: user?.displayName,
            photoURL: user?.photoURL,
            email: user?.email,
          }
        );

        console.log("Message added with ID: ", messageRef.id);
      } catch (error) {
        console.error("Error adding message: ", error);
      }
    }

    inputRef.current.value = "";
    scrollToBottom();
  };
  const scrollToBottom = () => {
    chatRef.current.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };
  return (
    <div className="flex flex-col h-screen">
      <header className="flex items-center justify-between space-x-5 border-b border-gray-800 p-4 -mt-1">
        <div className="flex items-center space-x-1">
          <HashtagIcon className="h-6 text-[#72767d]" />
          <h4 className="text-white font-semibold">{channelName}</h4>
        </div>
        <div className="flex space-x-3">
          <BellIcon className="h-6 text-[#72767d]" />
          <ChatBubbleOvalLeftEllipsisIcon className="h-6 text-[#72767d]" />
          <UsersIcon className="h-6 text-[#72767d]" />
          <div className="bg-[#202225] flex rounded-md p-1 text-sm">
            <input
              type="text"
              placeholder="Search"
              className=" bg-transparent focus:outline-none text-white placeholder-[#72767d] pl-1"
            />
            <MagnifyingGlassIcon className="h-6 text-[#72767d]" />
          </div>
          <InboxIcon className="h-6 text-[#72767d]" />
          <QuestionMarkCircleIcon className="h-6 text-[#72767d]" />
        </div>
      </header>
      <main className="flex-grow overflow-y-scroll scrollbar-hide">
        {/* <ChatFeed/> */}
        {/* <ChatBar/> */}
        {messages?.docs.map((doc) => {
            const { message, name, email, timestamp, photoURL } =  doc.data();
            return <Message key={doc.id} id={doc.id} message={message} name={name} email={email} timestamp={timestamp} photoURL={photoURL} />
        })}
        {!channelId && <p className="text-center text-white mt-10">
          Select a channel to start messaging
        </p>}
        <div>
          <div ref={chatRef} className="pb-16"></div>
        </div>
      </main>
      <div className="bg-[#40444b] p-2 flex items-center mx-5 mb-7 rounded-lg ">
        <PlusCircleIcon className="h-6 text-[#bcbfc5]" />
        <form className="flex-grow">
          <input
            type="text"
            placeholder={
              channelId ? `Message #${channelName}` : "Select a channel"
            }
            className="bg-transparent focus:outline-none text-[#dcddde] placeholder-[#72767d] pl-1 w-full text-sm"
            disabled={!channelId}
            ref={inputRef}
          />
          <button type="submit" className="hidden" onClick={sendMessage}>
            Send
          </button>
        </form>
        <GiftIcon className="icon mr-2" />
        <FaceSmileIcon className="icon" />
      </div>
    </div>
  );
};
