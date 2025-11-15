export const LOCATION_TREE_QUERY = `
  query LocationTree {
    locationTree {
      id
      name
      states {
        id
        name
        cities {
          id
          name
        }
      }
    }
  }
`;
