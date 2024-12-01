import { faPaperclip } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSelector } from "react-redux";

const GroupInput = () => {
  const { mode } = useSelector((state) => state.mode);

  return (
    <div className=" w-full h-14 absolute bottom-[25px]">
      <FontAwesomeIcon
        icon={faPaperclip}
        className={`${
          mode === "dark" ? "text-message" : "text-message_light"
        } text-xl   ${
          mode === "dark" ? "hover:text-white" : "hover:text-message"
        }  -translate-y-1/2 cursor-pointer relative -bottom-[51px] -right-2`}
      />
      <input
        type="text"
        className={`${
          mode === "dark" ? "bg-main" : "bg-light_main"
        } pl-12 py-3 w-full h-full ${
          mode === "dark" ? "placeholder-message" : "placeholder-message_light"
        }`}
        placeholder="Upload file"
        disabled
      />
    </div>
  );
};

export default GroupInput;
