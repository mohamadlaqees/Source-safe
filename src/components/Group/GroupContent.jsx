import { useSelector } from "react-redux";
import { files } from "../../utils/constant";
import File from "../File";

const GroupContent = () => {
  const { mode } = useSelector((state) => state.mode);

  return (
    <div
      className={`my-8 mx-4 h-[80%]  overflow-hidden scrollbar-thin  ${
        mode === "dark"
          ? "scrollbar-thumb-gray-700 scrollbar-track-gray-500"
          : "scrollbar-thumb-slate-300 scrollbar-track-slate-100"
      } hover:overflow-y-scroll  `}
    >
      {files.map((file) => (
        <File
          key={file.id}
          id={file.id}
          name={file.name}
          sender={file.sender}
          status={file.status}
        />
      ))}
    </div>
  );
};

export default GroupContent;
