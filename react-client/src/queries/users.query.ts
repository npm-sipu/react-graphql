export const GET_USERS_QUERY = `
  query Users($countryId: ID, $stateId: ID, $cityId: ID) {
    users(countryId: $countryId, stateId: $stateId, cityId: $cityId) {
      id
      firstName
      lastName
      email
      dob
      role
      createdAt
      country {
        id
        name
      }
      state {
        id
        name
      }
      city {
        id
        name
      }
    }
  }
`;
