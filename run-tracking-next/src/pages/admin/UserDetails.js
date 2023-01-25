import React from "react";
import { gql, useQuery } from "@apollo/client";
const GET_USERS_DETAILS = gql`
  query FindUsersDetails {
    users {
      id
      firstName
      lastName
      bib
      currentCheckpoint
      Run {
        distance
        park {
          name
        }
      }
    }
  }
`;
export default function UserDetails() {
  return <div>UserDetails</div>;
}
