import { faUserGroup } from "@fortawesome/free-solid-svg-icons";
import GroupList from "./GroupList";
import Header from "./Header";
import { users } from "../utils/constant";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { reduceTheSize } from "../store/LeftSide/leftSideSlice";

const LeftSidebar = () => {
  const dispatch = useDispatch();
  const { smallWidth } = useSelector((state) => state.side);
  const { mode } = useSelector((state) => state.mode);
  const [width, setWidth] = useState(480);

  const clickHandler = (id) => {
    console.log(id);
  };

  const resize = (e) => {
    let newWidth = Math.max(80, Math.min(e.clientX, 480));
    if (newWidth < 300 && width > 80) {
      newWidth = 80;
    } else if (width < 300 && width >= 80) {
      newWidth = 300;
    }
    setWidth(newWidth);
  };

  const startResizing = () => {
    document.addEventListener("mousemove", resize);
    document.addEventListener("mouseup", stopResizing);
  };

  const stopResizing = () => {
    document.removeEventListener("mousemove", resize);
    document.removeEventListener("mouseup", stopResizing);
  };

  useEffect(() => {
    return () => {
      stopResizing();
    };
  }, []);

  useEffect(() => {
    if (width === 80) {
      dispatch(reduceTheSize({ smallWidth: true }));
    } else if (width >= 300) {
      dispatch(reduceTheSize({ smallWidth: false }));
    }
  }, [width, dispatch]);

  return (
    <div
      style={{ width: `${width}px` }}
      className={`relative  h-lvh  ${
        mode === "dark" ? "bg-main" : "bg-light_main"
      } `}
    >
      <Header smallWidth={smallWidth} />
      <GroupList
        leftSide={true}
        data={users}
        circle="w-14 h-14"
        circleBG={`${mode === "dark" ? "bg-secondary" : "bg-light_secondary"}`}
        faUserGroup={faUserGroup}
        hover={true}
        padding="py-4 px-2"
        pointer={true}
        text="text-xs font-bold"
        lastMessage={true}
        time={true}
        onClick={clickHandler}
        openTheGroup={true}
        smallWidth={smallWidth}
      />

      <div
        className="absolute right-[-6px] top-0 h-full w-3 cursor-ew-resize "
        onMouseDown={startResizing}
      />
    </div>
  );
};

export default LeftSidebar;
