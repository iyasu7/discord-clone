import PropTypes from "prop-types";
import moment from "moment";
import { auth } from "../firebase";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebase";
import { TrashIcon } from "@heroicons/react/24/outline";
import { useSelector } from "react-redux";
import { selectChannelId } from "../features/channelSlice";

export const Message = ({ id, message, name, photoURL, email, timestamp }) => {
  
  const { user } = auth;
  const channelId = useSelector(selectChannelId);

  const deleteMessage = (e) => {
    e.preventDefault();
    try {
      const messageRef = doc(doc(db, "channels", channelId), "messages", id);
      deleteDoc(messageRef);
    } catch (error) {
      console.error("Error deleting message: ", error);
    }
  };

  return (
    <div className="flex items-center p-1 pl-5 hover:bg-[#32353b] my-5 mr-2 group">
      <img
        src={photoURL}
        alt="${name} Profile Photo"
        className="h-10 rounded-full cursor-pointer mr-4 hover:shadow-2xl"
      />
      <div className="flex flex-col">
        <h4 className="flex items-center space-x-2 font-medium">
          <span className="hover:underline text-white text-sm cursor-pointer">
            {name}
          </span>
          <span className="text-[#72767d] text-xs font-medium">
            {moment(timestamp?.toDate().getTime()).format("lll")}
          </span>
        </h4>
        <p className="text-[#dcddde]">{message}</p>
      </div>
      {email !== user?.email && (
        <div className="ml-auto bg-transparent text-[#ee6688] hover:text-[#da47e7] hover:shadow-xl">
          <TrashIcon
            className="h-5 hidden mr-2 group-hover:inline cursor-pointer"
            onClick={deleteMessage}
          />
        </div>
      )}
    </div>
  );
};
Message.propTypes = {
  id: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  photoURL: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
};
