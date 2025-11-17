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

export const CREATE_USER_MUTATION = `
  mutation CreateUser($input: CreateUserInput!) {
    createUser(input: $input) {
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
        code
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

export const EDIT_USER_MUTATION = `
  mutation EditUser($id: ID!, $input: EditUserInput!) {
    editUser(id: $id, input: $input) {
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
        code
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
