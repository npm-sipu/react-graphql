import { z } from "zod";

// Define the shape of a single user
export const userSchema = z.object({
  id: z.string().or(z.number()), // flexible for GraphQL/DB variations
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email format"),
  role: z.string().optional(),
  createdAt: z.string().optional(), // ISO string or timestamp
});

// Define the shape of users response
export const usersResponseSchema = z.object({
  users: z.array(userSchema),
});

// Infer types from schema for full type safety
export type TUser = z.infer<typeof userSchema>;
export type TUsersResponse = z.infer<typeof usersResponseSchema>;
