import { LOCATION_TREE_QUERY } from "../queries/locationTree.query";
import {
  type LocationTreeResponse,
  LocationDataSchema,
} from "../schemas/locations.schema";
import { fetchGraphQL } from "./baseApi";

export const getLocationTree = async (): Promise<LocationTreeResponse> => {
  return fetchGraphQL<LocationTreeResponse>(
    LOCATION_TREE_QUERY,
    {},
    LocationDataSchema
  );
};
