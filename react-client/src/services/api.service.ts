import { LOCATION_TREE_QUERY } from "../queries/locationTree.query";
import { GET_USERS_QUERY } from "../queries/users.query";
import {
  type LocationTreeResponse,
  LocationDataSchema,
} from "../schemas/locations.schema";
import {
  type UsersResponse,
  UsersResponseSchema,
} from "../schemas/user.schema";
import { fetchGraphQL } from "./baseApi";

export const getLocationTree = async (): Promise<LocationTreeResponse> => {
  return fetchGraphQL<LocationTreeResponse>(
    LOCATION_TREE_QUERY,
    {},
    LocationDataSchema
  );
};

export type UserFilters = {
  countryId?: string;
  stateId?: string;
  cityId?: string;
};

export const getUsers = async (
  filters: UserFilters = {}
): Promise<UsersResponse> => {
  return fetchGraphQL<UsersResponse>(
    GET_USERS_QUERY,
    filters,
    UsersResponseSchema
  );
};
