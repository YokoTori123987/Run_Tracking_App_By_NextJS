import { gql, useQuery } from "@apollo/client";
import React from "react";
// import Link from "next/link";
const GET_UUSER = gql`
  query GetUser {
    users {
      id
      firstName
    }
  }
`;
export default function signup() {
  const { loading, error, data } = useQuery(GET_UUSER);
  if (loading) return "Loading...";
  if (error) return `Error! ${error.message}`;
  return (
    <>
      <div>signup</div>
      <h1>
        {data.users.map((value) => {
          {
            value.firstName;
          }
        })}
      </h1>
    </>
  );
}
