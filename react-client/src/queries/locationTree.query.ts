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

export const COUNTRIES_QUERY = `
  query {
    countries {
      id
      name
    }
  }
`;

export const STATES_QUERY = `
  query($countryId: ID!) {
    states(countryId: $countryId) {
      id
      name
    }
  }
`;

export const CITIES_QUERY = `
  query($stateId: ID!) {
    cities(stateId: $stateId) {
      id
      name
    }
  }
`;
