import { useDispatch, useSelector } from "react-redux";
import {
  addMembersFromGroup,
  openGroupMembers,
  openNewGroup,
  refetchGroup,
  setGroupName,
} from "../../store/Group/groupSlice";
import ReactDOM from "react-dom";
import { openBackdrop } from "../../store/Drawer/drawerSlice";
import TextField from "@mui/material/TextField";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { groupNameValidation } from "../../utils/validation/GroupValidation";
import { useCreateNewGroupMutation } from "../../store/Api/ApiSlice";
import GroupMembers from "./GroupMembers";
import { LoadingButton } from "@mui/lab";
import { useEffect } from "react";

const NewGroup = () => {
  const { newGroup, groupMembers, name } = useSelector((state) => state.group);
  const { mode } = useSelector((state) => state.mode);
  const dispatch = useDispatch();
  const [createNewGroup, { isError, error, isLoading }] =
    useCreateNewGroupMutation();

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      groupName: "",
    },
    resolver: zodResolver(groupNameValidation),
    mode: "onSubmit",
  });

  useEffect(() => {
    if (name !== "") {
      reset({
        groupName: "",
      });
      dispatch(setGroupName({ name: "" }));
    }
  }, [name, reset, dispatch]);

  const groupNameSubmit = async (data) => {
    if (data.groupName.trim() !== "") {
      try {
        await createNewGroup({
          title: data.groupName,
        }).unwrap();
      } catch (error) {
        console.log(error);
      }
      dispatch(refetchGroup({ refetchGroupList: true }));
      dispatch(openGroupMembers({ groupMembers: true }));
      dispatch(setGroupName({ name: data.groupName }));
      dispatch(addMembersFromGroup({ addMembersFromGroup: false }));
    }
  };

  const Backdrop = () => {
    return (
      <div
        className={`absolute w-full h-full   bg-black opacity-30  z-30`}
        onClick={() => {
          dispatch(openBackdrop({ backdrop: false }));
          dispatch(openNewGroup({ newGroup: false }));
          reset({
            groupName: "",
          });
        }}
      />
    );
  };

  const Overlay = () => {
    return (
      <>
        {groupMembers && <GroupMembers />}
        <div
          className={` ${
            mode === "dark" ? "bg-main" : "bg-light_main"
          }  rounded-lg absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-40 w-80  aboveMobile:w-96 p-5`}
        >
          <div className="flex gap-3  ">
            <div
              className={`rounded-full flex justify-center items-center w-16 h-16 ${
                mode === "dark" ? "bg-slate-700" : "bg-light_secondary"
              } text-white font-bold`}
            >
              N
            </div>

            <form onSubmit={handleSubmit(groupNameSubmit)}>
              <Controller
                name="groupName"
                control={control}
                render={({ field }) => (
                  <TextField
                    variant="standard"
                    {...field}
                    label="Group name"
                    fullWidth
                    autoFocus
                    error={!!errors?.groupName || undefined}
                    helperText={errors?.groupName?.message}
                    sx={{
                      "& .MuiInput-underline:before": {
                        borderBottomColor: `${
                          mode === "dark" ? "#707172 " : "#999999"
                        }`, // Normal state
                      },
                      "& .MuiInput-underline:hover:not(.Mui-disabled):before": {
                        borderBottomColor: `${
                          mode === "dark" ? "#334155 " : "#74b5e0"
                        }`, // Hover state
                      },
                      "& .MuiInput-underline:after": {
                        borderBottomColor: `${
                          mode === "dark" ? "#334155 " : "#74b5e0"
                        }`, // Focused state
                      },
                      "& .MuiInputLabel-root": {
                        color: `${mode === "dark" ? "#707172 " : "#999999"}`, // Label color
                      },
                      "& .MuiInputLabel-root.Mui-focused": {
                        color: `${mode === "dark" ? "#334155" : "#74b5e0"}`, // Label color when focused
                      },
                      "& .MuiFormLabel-root.Mui-error": {
                        color: "#dc2626", // Error label color (red)
                      },
                      "& .MuiInput-underline.Mui-error:after": {
                        borderBottomColor: "#dc2626", // Error underline color (red)
                      },
                      "& .MuiInputBase-input": {
                        color: `${mode === "dark" ? "#ffffff" : "#"}`, // Text color in the input (white)
                      },
                    }}
                  />
                )}
              />

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
                    dispatch(openNewGroup({ newGroup: false }));
                    dispatch(openBackdrop({ backdrop: false }));
                    reset({
                      groupName: "",
                    });
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
                  type="submit"
                  disabled={isLoading}
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
                      "Next"
                    )}
                  </>
                </button>
              </div>
            </form>
          </div>
        </div>
      </>
    );
  };

  return (
    <>
      {newGroup && (
        <>
          {ReactDOM.createPortal(
            <Backdrop />,
            document.getElementById("new-group-backdrop-root")
          )}

          {ReactDOM.createPortal(
            <Overlay />,
            document.getElementById("new-group-overlay-root")
          )}
        </>
      )}
    </>
  );
};

export default NewGroup;
