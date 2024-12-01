import ReactDOM from "react-dom";
import { useDispatch, useSelector } from "react-redux";
import { openFilesBackups } from "../../store/Group/groupSlice";

const GroupFilesBackups = () => {
  const { filesBackups } = useSelector((state) => state.group);
  const { mode } = useSelector((state) => state.mode);
  const dispatch = useDispatch();

  const Backdrop = () => {
    return (
      <div
        className="absolute w-full h-full bg-black opacity-30 z-30"
        onClick={() => {
          dispatch(openFilesBackups({ filesBackups: false }));
        }}
      />
    );
  };

  const Overlay = () => {
    return <div></div>;
  };

  return (
    <>
      {filesBackups && (
        <>
          {ReactDOM.createPortal(
            <Backdrop />,
            document.getElementById("backups-backdrop-root")
          )}
          {ReactDOM.createPortal(
            <Overlay />,
            document.getElementById("backups-overlay-root")
          )}
        </>
      )}
    </>
  );
};

export default GroupFilesBackups;
