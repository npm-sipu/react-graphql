import axios from "axios";
import type { TAny } from "../schemas/common.schema";
import {
  usersResponseSchema,
  type TUsersResponse,
} from "../schemas/user.schema";
import type z from "zod";

const baseURL = "http://localhost:4000/graphql";

const axiosInstance = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;

/**
 * Generic GraphQL fetcher with Zod validation
 */
export const fetchGraphQL = async <T>(
  query: string,
  variables?: Record<string, TAny>,
  schema?: z.ZodSchema<T>
): Promise<T> => {
  try {
    const response = await axiosInstance.post("", {
      query,
      variables,
    });

    if (response.data.errors) {
      console.error("GraphQL errors:", response.data.errors);
      throw new Error("GraphQL query failed");
    }

    const data = response.data.data;

    // Validate response with schema if provided
    if (schema) {
      return schema.parse(data);
    }

    return data as T;
  } catch (error) {
    console.error("GraphQL fetch error:", error);
    throw new Error("Failed to fetch GraphQL data");
  }
};

export const usersData = async (): Promise<TUsersResponse> => {
  const response = await axiosInstance.post("", {
    query: `
      {
        users {
          id
          name
          email
          role
          createdAt
        }
      }
    `,
  });

  // Validate with Zod for type safety
  const parsed = usersResponseSchema.parse(response.data.data);
  return parsed;
};
