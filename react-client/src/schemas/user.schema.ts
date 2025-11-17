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

export const UserLocationSchema = z.object({
  id: z.string(),
  name: z.string(),
});

export const UserSchema = z.object({
  id: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  email: z.string(),
  dob: z.string().nullable().optional(),
  role: z.string().nullable().optional(),
  createdAt: z.string().nullable().optional(),

  country: UserLocationSchema,
  state: UserLocationSchema,
  city: UserLocationSchema,
});

export const UsersResponseSchema = z.object({
  users: z.array(UserSchema),
});

export type UsersResponse = z.infer<typeof UsersResponseSchema>;

export const CreateUserInputSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  email: z.string().email(),
  dob: z.string().optional(),
  countryId: z.string(),
  stateId: z.string(),
  cityId: z.string(),
  role: z.string().optional(),
});

export type CreateUserInput = z.infer<typeof CreateUserInputSchema>;

export const LocationBaseSchema = z.object({
  id: z.string(),
  name: z.string(),
});

export const CountrySchema = LocationBaseSchema.extend({
  code: z.string().nullable().optional(),
});

export const CreateUserResponseSchema = z.object({
  createUser: z.object({
    id: z.string(),
    firstName: z.string(),
    lastName: z.string(),
    email: z.string().email(),
    dob: z.string().nullable().optional(),
    role: z.string().nullable().optional(),
    createdAt: z.string().optional(),
    country: CountrySchema,
    state: LocationBaseSchema,
    city: LocationBaseSchema,
  }),
});

export type CreateUserResponse = z.infer<typeof CreateUserResponseSchema>;
