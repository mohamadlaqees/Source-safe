import { z } from "zod";

export const groupNameValidation = z.object({
  groupName: z.string().min(1, { message: "name is required" }),
});
