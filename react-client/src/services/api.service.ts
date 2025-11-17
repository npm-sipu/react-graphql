import {
  CITIES_QUERY,
  COUNTRIES_QUERY,
  LOCATION_TREE_QUERY,
  STATES_QUERY,
} from "../queries/locationTree.query";
import { CREATE_USER_MUTATION, GET_USERS_QUERY } from "../queries/users.query";
import {
  type CitiesResponse,
  type CountriesResponse,
  type LocationTreeResponse,
  type StatesResponse,
  CitiesOptionsSchema,
  CountriesOptionsSchema,
  LocationDataSchema,
  StatesOptionsSchema,
} from "../schemas/locations.schema";
import {
  type CreateUserInput,
  type CreateUserResponse,
  CreateUserResponseSchema,
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

export const getCountries = async (): Promise<CountriesResponse> => {
  return fetchGraphQL<CountriesResponse>(
    COUNTRIES_QUERY,
    {},
    CountriesOptionsSchema
  );
};

export const getStates = async (countryId: string): Promise<StatesResponse> => {
  return fetchGraphQL<StatesResponse>(
    STATES_QUERY,
    { countryId },
    StatesOptionsSchema
  );
};

export const getCities = async (stateId: string): Promise<CitiesResponse> => {
  return fetchGraphQL<CitiesResponse>(
    CITIES_QUERY,
    { stateId },
    CitiesOptionsSchema
  );
};

export const createUser = async (
  input: CreateUserInput
): Promise<CreateUserResponse> => {
  return fetchGraphQL<CreateUserResponse>(
    CREATE_USER_MUTATION,
    { input },
    CreateUserResponseSchema
  );
};
