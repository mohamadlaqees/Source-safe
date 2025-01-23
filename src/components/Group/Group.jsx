import { useDispatch, useSelector } from "react-redux";
import GroupContent from "./GroupContent";
import GroupHeader from "./GroupHeader";
import GroupInput from "./GroupInput";
import GroupInfo from "./GroupInfo";
import GroupMembers from "./GroupMembers";
import DeletePrompt from "./DeletePrompt";
import LoadingSpinner from "../LoadingSpinner";
import { useBrowsGroupMutation } from "../../store/Api/ApiSlice";
import { useEffect } from "react";
import {
  refetchBrowsGroup,
  refetchGroupFiles,
  setGroupFiles,
  setGroupInfo,
} from "../../store/Group/groupSlice";
import FileReport from "../file/FileReport";
import UserReport from "../user/UserReport";
import FileBackups from "../file/FileBackups";

const Group = () => {
  const {
    groupInfo,
    groupMembers,
    deletePrompt,
    ID,
    refetchTheFiles,
    refetchTheBrows,
    groupFiles,
    groups,
  } = useSelector((state) => state.group);
  const { allUsers: users } = useSelector((state) => state.side);
  const dispatch = useDispatch();

  const [
    browsGroup,
    {
      isError: browsGroupIsError,
      error: browsGroupError,
      isLoading: browsGroupIsLoading,
    },
  ] = useBrowsGroupMutation();

  useEffect(() => {
    const getGroupFiles = async () => {
      try {
        const groupData = await browsGroup({ groupID: ID }).unwrap();
        dispatch(setGroupInfo({ groupInfo: groupData.data.info }));
        dispatch(refetchGroupFiles({ refetchTheFiles: false }));
        dispatch(refetchBrowsGroup({ refetchTheBrows: false }));
        dispatch(
          setGroupFiles({
            groupFiles: groups.find((group) => group.id === ID).file,
          })
        );
      } catch (err) {
        console.log(err);
      }
    };
    getGroupFiles();
  }, [ID, groups, browsGroup, refetchTheFiles, refetchTheBrows, dispatch]);

  return (
    <div className="w-full h-full  relative overflow-clip">
      {deletePrompt && <DeletePrompt />}
      {groupMembers && <GroupMembers users={users} />}

      {browsGroupIsLoading ? (
        <LoadingSpinner spinnerColor={"white"} />
      ) : (
        <>
          <UserReport />
          <FileReport />
          <FileBackups />
          <GroupInfo users={users} />
          <GroupHeader
            groupName={groupInfo.name_folder}
            numOfMember={groupInfo.numOfMember + 1}
            users={users}
          />
          <GroupContent groupFiles={groupFiles} users={users} />
          <GroupInput numOfMember={groupInfo.numOfMember + 1} />
        </>
      )}
    </div>
  );
};

export default Group;
