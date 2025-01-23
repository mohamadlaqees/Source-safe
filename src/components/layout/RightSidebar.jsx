import { useSelector } from "react-redux";
import Group from "../group/Group";

const RightSidebar = () => {
  const { mode } = useSelector((state) => state.mode);
  const { openGroup } = useSelector((state) => state.group);

  return (
    <div
      className={` h-lvh aboveMobile:min-w-[400px] w-lvw flex flex-1 justify-center items-center  ${
        mode === "dark" ? "bg-secondary" : "bg-light_secondary"
      }  `}
    >
      {openGroup ? (
        <Group />
      ) : (
        <p className={"text-white font-bold"}>Select groub to start</p>
      )}
    </div>
  );
};

export default RightSidebar;
