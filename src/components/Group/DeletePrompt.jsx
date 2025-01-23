import { useDispatch, useSelector } from "react-redux";
import ReactDOM from "react-dom";
import {
  deleteAction,
  openGroupMembers,
  refetchBrowsGroup,
  refetchGroupMembers,
} from "../../store/Group/groupSlice";
import { useDeletePermissionMutation } from "../../store/Api/ApiSlice";
import { LoadingButton } from "@mui/lab";

const DeletePrompt = () => {
  const { ID, deletePrompt, removedUserName, removedUserID } = useSelector(
    (state) => state.group
  );
  const { mode } = useSelector((state) => state.mode);
  const [deletePermission, { error, isError, isLoading }] =
    useDeletePermissionMutation();

  const dispatch = useDispatch();

  const removeHandler = async () => {
    try {
      await deletePermission({ groupID: ID, memberID: removedUserID });
      dispatch(refetchGroupMembers({ refetchTheMembers: true }));
    } catch (error) {
      console.log(error);
    }
    dispatch(deleteAction({ deletePrompt: false }));
    dispatch(openGroupMembers({ groupMembers: false }));
    dispatch(refetchBrowsGroup({ refetchTheBrows: true }));
  };

  const Backdrop = () => {
    return (
      <div
        className="absolute w-full h-full bg-black opacity-30 z-30"
        onClick={() => {
          dispatch(deleteAction({ deletePrompt: false }));
          dispatch(openGroupMembers({ groupMembers: false }));
        }}
      />
    );
  };

  const Overlay = () => {
    return (
      <div
        className={` ${
          mode === "dark" ? "bg-main" : "bg-light_main"
        }  rounded-lg absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[40]  w-80  aboveMobile:w-[484px] p-5`}
      >
        <p
          className={` ${mode === "dark" ? " text-light_main" : "text-main"}`}
        >{`Remove ${removedUserName} from the group?`}</p>
        <div
          className={`flex justify-end gap-4  ${
            mode === "dark" ? "bg-main" : "bg-light_main"
          }  pt-6`}
        >
          <button
            className={`bg-transparent py-1.5 px-4 ${
              mode === "dark" ? "hover:bg-gray-700" : "hover:bg-[#D3EDF8]"
            }  ${
              mode === "dark" ? "text-slate-300" : "text-light_secondary"
            }  rounded-lg`}
            onClick={() => {
              dispatch(deleteAction({ deletePrompt: false }));
              dispatch(openGroupMembers({ groupMembers: false }));
            }}
          >
            Cancel
          </button>
          <button
            className={`  ${
              isLoading
                ? mode === "dark"
                  ? "bg-gray-700 "
                  : "bg-[#D3EDF8]"
                : "bg-transparent "
            }
                   py-1.5 px-4 ${
                     mode === "dark"
                       ? "hover:bg-gray-700"
                       : "hover:bg-[#D3EDF8]"
                   }  ${
              mode === "dark" ? "text-slate-300" : "text-light_secondary"
            }
                    rounded-lg 
                 `}
            disabled={isLoading}
            onClick={removeHandler}
          >
            <>
              {isLoading ? (
                <LoadingButton
                  type="submit"
                  variant="text"
                  loadingPosition="center"
                  loading
                  sx={{
                    "& .MuiCircularProgress-root": {
                      color: `${mode === "dark" ? "#cbd5e1" : "white"}`,
                    },
                  }}
                />
              ) : (
                "Remove"
              )}
            </>
          </button>
        </div>
      </div>
    );
  };

  return (
    <>
      {deletePrompt && (
        <>
          {ReactDOM.createPortal(
            <Backdrop />,
            document.getElementById("delete-prompt-backdrop-root")
          )}
          {ReactDOM.createPortal(
            <Overlay />,
            document.getElementById("delete-prompt-overlay-root")
          )}
        </>
      )}
    </>
  );
};

export default DeletePrompt;
