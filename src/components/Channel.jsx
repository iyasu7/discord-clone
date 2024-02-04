import PropTypes from "prop-types";
import { HashtagIcon } from "@heroicons/react/24/outline";
import { setChannelInfo } from "../features/channelSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
export const Channel = ({ id, channelName }) => {
  const dispatch = useDispatch();
  const navigateTo = useNavigate();
  const setChannel = () => {
    dispatch(
      setChannelInfo({
        channelId: id, 
        channelName: channelName,
      })
    );
    navigateTo(`/channels/${id}`);
  };
  return (
    <div
      className="flex items-center space-x-2 cursor-pointer font-medium hover:bg-[#3a3c43] hover:text-white rounded-md p-1"
      onClick={setChannel}
    >
      <HashtagIcon className="h-5 text-gray-500 mr-2" />
      {channelName}
    </div>
  );
};

Channel.propTypes = {
  id: PropTypes.string.isRequired,
  channelName: PropTypes.string.isRequired,
};
