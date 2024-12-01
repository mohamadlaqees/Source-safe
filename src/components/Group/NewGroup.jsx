import { useDispatch, useSelector } from "react-redux";
import { createGroup, openGroupMembers } from "../../store/Group/groupSlice";
import ReactDOM from "react-dom";
import { openOverLay } from "../../store/Drawer/drawerSlice";
import TextField from "@mui/material/TextField";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { groupNameValidation } from "../../utils/validation/GroupValidation";
import { useEffect } from "react";
import { useCreateNewGroupMutation } from "../../store/Api/ApiSlice";

const NewGroup = () => {
  const { newGroup, resetGroupName } = useSelector((state) => state.group);
  const { mode } = useSelector((state) => state.mode);
  const dispatch = useDispatch();
  const [createNewGroup, { isError, error }] = useCreateNewGroupMutation();

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

  const groupNameSubmit = (data) => {
    console.log(data);
    if (data.groupName.trim() !== "") {
      dispatch(openGroupMembers({ groupMembers: true }));
    }
  };

  useEffect(() => {
    if (resetGroupName) {
      reset({
        groupName: "",
      });
    }
  }, [reset, resetGroupName]);

  const Backdrop = () => {
    return (
      <div
        className={` ${
          mode === "dark" ? "bg-main" : "bg-light_main"
        }  rounded-xl absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 w-96 p-5`}
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
                  dispatch(createGroup({ newGroup: false }));
                  dispatch(openOverLay({ overlay: false }));
                  reset({
                    groupName: "",
                  });
                }}
              >
                Cancel
              </button>
              <button
                className={`bg-transparent py-1.5 px-4 ${
                  mode === "dark" ? "hover:bg-gray-700" : "hover:bg-[#D3EDF8]"
                }  ${
                  mode === "dark" ? "text-slate-300" : "text-light_secondary"
                } rounded-lg`}
                type="submit"
              >
                Next
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  return (
    <>
      {newGroup &&
        ReactDOM.createPortal(
          <Backdrop />,
          document.getElementById("new-group-root")
        )}
    </>
  );
};

export default NewGroup;
