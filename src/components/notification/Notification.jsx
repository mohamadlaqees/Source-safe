import dayjs from "dayjs";
import { useSelector } from "react-redux";

/* eslint-disable react/prop-types */
const Notification = ({
  fileName,
  userName,
  action,
  created_at,
  read_at,
  unread,
}) => {
  const { mode } = useSelector((state) => state.mode);

  const date = dayjs(unread ? created_at : read_at).format(
    "MMMM D, YYYY h:mm A"
  );

  return (
    <div
      className={`
         ${
           unread
             ? `${mode === "dark" ? "bg-gray-700 " : "bg-fourth_light"} `
             : ""
         }
         flex-1 px-4 py-2 cursor-pointer 
    ${mode === "dark" ? "hover:bg-gray-700 " : "hover:bg-fourth_light"} 
         `}
    >
      <div className="flex justify-between items-center ">
        <>
          <h1>
            <span
              className="inline-block overflow-hidden text-ellipsis  w-[100px]"
              title={fileName}
            >
              {fileName}
            </span>
          </h1>
          <div>{date}</div>
        </>
      </div>

      <p className="mt-1">
        {userName} did the action {`" ${action} "`} on {fileName}
      </p>
    </div>
  );
};

export default Notification;
