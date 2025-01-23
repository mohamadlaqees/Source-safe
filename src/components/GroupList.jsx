/* eslint-disable react/prop-types */
import { useDispatch, useSelector } from "react-redux";
import User from "./user/User";
import { setSelectedUserID } from "../store/LeftSide/leftSideSlice";

const GroupList = ({
  data,
  faUserGroup,
  hover,
  pointer,
  padding,
  text,
  circle,
  circleBG,
  item,
  margin,
  member,
  owner,
  onClick,
  firstName,
  memberStyle,
  remove,
  groupMembers,
  leftSide,
  laftSideWidth,
  smallWidth,
  deletePermissionHandler,
  theOwner,
  allGroupMembers,
  ownerName,
}) => {
  const { mode } = useSelector((state) => state.mode);
  const { allUsers, selectedUserID } = useSelector((state) => state.side);
  const dispatch = useDispatch();

  const leftClickHandler = (id) => {
    dispatch(setSelectedUserID({ selectedUserID: id }));
    onClick(id);
  };

  const clickHandler = (id) => {
    onClick(id);
  };
  let lastGroupFileName;
  let fileCreatorID;
  let createdDate;
  let updatedDate;
  let creatorName;
  return (
    <>
      <div className={` ${leftSide ? "h-full group overflow-hidden" : ""}`}>
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
          {data?.map((group) => {
            if (group.file && group.file.length > 0) {
              lastGroupFileName = group?.file[group.file.length - 1]?.name;
              fileCreatorID = group?.file[group.file.length - 1]?.created_by;
              createdDate = group?.file[group.file.length - 1]?.created_at;
              updatedDate = group?.file[group.file.length - 1]?.updated_at;
              creatorName = allUsers?.find(
                (user) => user.id === fileCreatorID
              ).user_name;
            } else {
              creatorName = allUsers?.find(
                (user) => user.id === group.created_by
              )?.user_name;
              createdDate = group?.created_at;
            }
            const alreadyMember = allGroupMembers?.find(
              (member) => member.user.id === group.id
            );

            return (
              <User
                key={group.id}
                id={group.id}
                icon={faUserGroup}
                name={group.name || group?.["user_name"]}
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
                theOwner={theOwner}
                firstName={firstName}
                remove={remove}
                groupMembers={groupMembers}
                smallWidth={smallWidth}
                isActive={
                  leftSide && selectedUserID === group.id ? true : false
                }
                clickHandler={leftSide ? leftClickHandler : clickHandler}
                deletePermissionHandler={deletePermissionHandler}
                lastGroupFileName={lastGroupFileName}
                creatorName={creatorName}
                createdDate={createdDate}
                updatedDate={updatedDate}
                groupFiles={group?.file?.length}
                leftSide={leftSide}
                laftSideWidth={laftSideWidth}
                alreadyMember={
                  allGroupMembers?.length === 0 && group.user_name !== owner
                    ? false
                    : alreadyMember || group.user_name === ownerName
                    ? true
                    : ""
                }
              />
            );
          })}
        </div>
      </div>
    </>
  );
};
// alreadyMember !== undefined ||
// alreadyMember?.user.user_name === owner
//   ? true
//   : false
export default GroupList;
