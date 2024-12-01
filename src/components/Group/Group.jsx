import { useSelector } from "react-redux";
import GroupContent from "./GroupContent";
import GroupHeader from "./GroupHeader";
import GroupInput from "./GroupInput";
import GroupInfo from "./GroupInfo";
import GroupMembers from "./GroupMembers";
import GroupFilesBackups from "./GroupFilesBackups";

const Group = () => {
  const { name } = useSelector((state) => state.group);
  return (
    <div className="w-full h-full  relative overflow-clip   ">
      <GroupFilesBackups />
      <GroupMembers />
      <GroupInfo />
      <GroupHeader name={name} />
      <GroupContent />
      <GroupInput />
    </div>
  );
};

export default Group;
