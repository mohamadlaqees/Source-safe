/* eslint-disable react/prop-types */
import { useSelector } from "react-redux";
import User from "./User";

const GroupList = ({
  data,
  faUserGroup,
  hover,
  pointer,
  padding,
  text,
  circle,
  circleBG,
  lastMessage,
  time,
  item,
  margin,
  member,
  owner,
  onClick,
  openTheGroup,
  firstName,
  memberStyle,
  remove,
  groupMembers,
  leftSide,
  smallWidth,
}) => {
  const { mode } = useSelector((state) => state.mode);
  
  return (
    <div className={` ${leftSide ? "h-groupList group overflow-hidden" : ""}`}>
      <div
        className={`h-full overflow-hidden ${memberStyle} ${
          leftSide
            ? `group-hover:overflow-y-scroll scrollbar-thin ${
                mode === "dark"
                  ? "scrollbar-thumb-gray-700 scrollbar-track-gray-500"
                  : "scrollbar-thumb-slate-300 scrollbar-track-slate-100"
              } `
            : ""
        } `}
      >
        {data.map((user) => (
          <User
            key={user.id}
            id={user.id}
            icon={faUserGroup}
            name={user.name}
            lastMessage={lastMessage ? user.lastMessage : ""}
            time={time ? user.time : ""}
            hover={hover}
            pointer={pointer}
            padding={padding}
            text={text}
            circle={circle}
            circleBG={circleBG}
            item={item}
            margin={margin}
            member={member}
            owner={owner}
            onClick={onClick}
            openTheGroup={openTheGroup}
            firstName={firstName}
            remove={remove}
            groupMembers={groupMembers}
            smallWidth={smallWidth}
          />
        ))}
      </div>
    </div>
  );
};

export default GroupList;
