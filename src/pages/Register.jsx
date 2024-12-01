import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Button, TextField, Typography } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { Controller, useForm } from "react-hook-form";
import { logInValidation } from "../utils/validation/UserValidation";
import { Link, useNavigate } from "react-router-dom";
import { useRegisterMutation } from "../store/Api/ApiSlice";

const Register = () => {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting, isValid, isDirty },
  } = useForm({
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
    resolver: zodResolver(logInValidation),
  });
  const [register, { isError, error }] = useRegisterMutation();
  const navigate = useNavigate();

  const registerHandler = async (data) => {
    try {
      const result = await register(data).unwrap();
      if (result?.data?.token) {
        localStorage.setItem("token", result.token);
        localStorage.setItem("userName", result.user.user_name);
        navigate("/");
      }
    } catch (error) {
      console.error("Register failed:", error);
    }
  };
  return (
    <div className="h-lvh w-lvw bg-secondary">
      <div className="w-96 min-h-96 h-fit p-4  bg-main rounded-lg  text-white relative top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <form onSubmit={handleSubmit(registerHandler)}>
          <Box
            sx={{
              marginTop: "40px",
            }}
          >
            <Controller
              name="username"
              control={control}
              render={({ field }) => (
                <TextField
                  variant="standard"
                  {...field}
                  label="User name"
                  fullWidth
                  autoFocus
                  error={!!errors?.username || undefined}
                  helperText={errors?.username?.message}
                  sx={{
                    marginBottom: "30px",
                    "& .MuiInput-underline:before": {
                      borderBottomColor: "#334155", // Normal state
                    },
                    "& .MuiInput-underline:hover:not(.Mui-disabled):before": {
                      borderBottomColor: "#64748b", // Hover state
                    },
                    "& .MuiInput-underline:after": {
                      borderBottomColor: "#64748b", // Focused state
                    },
                    "& .MuiInputLabel-root": {
                      color: "#64748b", // Label color
                    },
                    "& .MuiInputLabel-root.Mui-focused": {
                      color: "#64748b", // Label color when focused
                    },
                    "& .MuiFormLabel-root.Mui-error": {
                      color: "#dc2626", // Error label color (red)
                    },
                    "& .MuiInput-underline.Mui-error:after": {
                      borderBottomColor: "#dc2626", // Error underline color (red)
                    },
                    "& .MuiInputBase-input": {
                      color: "#ffffff", // Text color in the input (white)
                    },
                  }}
                />
              )}
            />

            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <TextField
                  variant="standard"
                  {...field}
                  label="Email"
                  fullWidth
                  autoFocus
                  error={!!errors?.email}
                  helperText={errors?.email?.message}
                  sx={{
                    marginBottom: "30px",
                    "& .MuiInput-underline:before": {
                      borderBottomColor: "#334155", // Normal state
                    },
                    "& .MuiInput-underline:hover:not(.Mui-disabled):before": {
                      borderBottomColor: "#64748b", // Hover state
                    },
                    "& .MuiInput-underline:after": {
                      borderBottomColor: "#64748b", // Focused state
                    },
                    "& .MuiInputLabel-root": {
                      color: "#64748b", // Label color
                    },
                    "& .MuiInputLabel-root.Mui-focused": {
                      color: "#64748b", // Label color when focused
                    },
                    "& .MuiFormLabel-root.Mui-error": {
                      color: "#dc2626", // Error label color (red)
                    },
                    "& .MuiInput-underline.Mui-error:after": {
                      borderBottomColor: "#dc2626", // Error underline color (red)
                    },
                    "& .MuiInputBase-input": {
                      color: "#ffffff", // Text color in the input (white)
                    },
                  }}
                />
              )}
            />

            <Controller
              name="password"
              control={control}
              render={({ field }) => (
                <TextField
                  variant="standard"
                  {...field}
                  label="Password"
                  type="password"
                  fullWidth
                  error={!!errors?.password || undefined}
                  helperText={errors?.password?.message}
                  sx={{
                    "& .MuiInput-underline:before": {
                      borderBottomColor: "#334155", // Normal state
                    },
                    "& .MuiInput-underline:hover:not(.Mui-disabled):before": {
                      borderBottomColor: "#64748b", // Hover state
                    },
                    "& .MuiInput-underline:after": {
                      borderBottomColor: "#64748b", // Focused state
                    },
                    "& .MuiInputLabel-root": {
                      color: "#64748b", // Label color
                    },
                    "& .MuiInputLabel-root.Mui-focused": {
                      color: "#64748b", // Label color when focused
                    },
                    "& .MuiFormLabel-root.Mui-error": {
                      color: "#dc2626", // Error label color (red)
                    },
                    "& .MuiInput-underline.Mui-error:after": {
                      borderBottomColor: "#dc2626", // Error underline color (red)
                    },
                    "& .MuiInputBase-input": {
                      color: "#ffffff", // Text color in the input (white)
                    },
                  }}
                />
              )}
            />
          </Box>
          <div className={`flex justify-end gap-4  pt-6`}>
            {isSubmitting ? (
              <LoadingButton
                type="submit"
                variant="text"
                size="large"
                sx={{
                  paddingY: "6px",
                  paddingX: "16px",
                  backgroundColor: "#374151",
                  color: "#64748b !important", // Text color
                  "& .MuiCircularProgress-root": {
                    color: "#64748b", // Loading icon color
                  },
                }}
                loadingPosition="start"
                loading
                startIcon={<span style={{ width: "24px", height: "24px" }} />} // Placeholder for loader
              >
                Registering
              </LoadingButton>
            ) : (
              <Button
                type="submit"
                variant="text"
                size="large"
                sx={{
                  paddingY: "6px",
                  paddingX: "16px",
                  backgroundColor: "transparent",
                  ":hover": {
                    backgroundColor: "#374151",
                  },
                  color: "#cbd5e1",
                }}
                disabled={!isDirty || !isValid || isSubmitting}
              >
                Register
              </Button>
            )}
          </div>

          {isError && (
            <>
              {console.log(error)}{" "}
              <Typography color="error" sx={{ mt: "100px" }}>
                {error ? "The account is already registered!" : ""}
              </Typography>
            </>
          )}
        </form>
        <div className="text-center text-[#64748b] hover:text-slate-300 my-12  transition-all  cursor-pointer ">
          <Link to={"/login"}>
            <p> have a previous account ? </p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
