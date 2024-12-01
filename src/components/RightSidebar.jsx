import { useSelector } from "react-redux";
import Group from "./Group/Group";

const RightSidebar = () => {
  const { name } = useSelector((state) => state.group);
  const { mode } = useSelector((state) => state.mode);

  return (
    <div
      className={`h-lvh flex flex-1 justify-center items-center  ${
        mode === "dark" ? "bg-secondary" : "bg-light_secondary"
      }  `}
    >
      {name !== "" ? (
        <Group />
      ) : (
        <p className={"text-white font-bold"}>Select groub to start</p>
      )}
    </div>
  );
};

export default RightSidebar;
