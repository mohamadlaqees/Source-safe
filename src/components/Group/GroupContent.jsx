/* eslint-disable react/prop-types */
import { useSelector } from "react-redux";
import File from "../file/File";

const GroupContent = ({ groupFiles, users }) => {
  const { mode } = useSelector((state) => state.mode);
  const { groupInfo } = useSelector((state) => state.group);
  const owner = users.find((user) => user.id === groupInfo.created_by)?.[
    "user_name"
  ];
  return (
    <div
      className={`my-8 mx-4 h-[80%]  overflow-hidden scrollbar-thin   ${
        mode === "dark"
          ? "scrollbar-thumb-gray-700 scrollbar-track-gray-500"
          : "scrollbar-thumb-slate-300 scrollbar-track-slate-100"
      } ${groupFiles.length > 0 ? "hover:overflow-y-scroll " : ""} `}
    >
      {groupFiles && groupFiles.length === 0 ? (
        <p
          className={`${
            mode === "dark" ? "text-white" : "text-text_light"
          } h-full font-bold flex flex-1 justify-center items-center`}
        >
          Empty
        </p>
      ) : (
        groupFiles.map((file) => {
          const sender = users.find((user) => user.id === file.created_by)?.[
            "user_name"
          ];

          const reserver = users.find((user) => user.id === file.reserved_by)?.[
            "user_name"
          ];
          return (
            <File
              key={file.id}
              id={file.id}
              name={file.name}
              sender={sender}
              status={file.free === 1 ? "Free" : `Reserved by ${reserver}`}
              createdAt={file.created_at}
              updatedAt={file.updated_at}
              reservedColor={reserver ? "bg-slate-400" : ""}
              canRemove={
                localStorage.getItem("userName") === sender ||
                localStorage.getItem("userName") === owner
                  ? true
                  : false
              }
            />
          );
        })
      )}
    </div>
  );
};

export default GroupContent;
