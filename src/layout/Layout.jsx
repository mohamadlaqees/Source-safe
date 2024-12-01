import Drawer from "../components/Drawer";
import GroupMembers from "../components/Group/GroupMembers";
import NewGroup from "../components/Group/NewGroup";
import LeftSidebar from "../components/LeftSidebar";
import RightSidebar from "../components/RightSidebar";

const Layout = () => {
  return (
    <div className="flex justify-between ">
      <GroupMembers />
      <NewGroup />
      <Drawer />
      <LeftSidebar />
      <RightSidebar />
    </div>
  );
};

export default Layout;
