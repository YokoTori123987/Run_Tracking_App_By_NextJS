import React from "react";
import { useState } from "react";
import { Select } from "antd";
// import { QrReader } from "react-qr-reader";
// import {}
import { gql, useMutation, useQuery } from "@apollo/client";
const GET_CHECK_PATH_PAGE = gql`
  query FindParks {
    parks {
      id
      name
      Checkpoint {
        id
        name
      }
    }
  }
`;

export default function CheckPath() {
  const { loading, error, data } = useQuery(GET_CHECK_PATH_PAGE);
  if (loading) return "Loading...";
  if (error) return `Error! ${error.message}`;
  console.log(data);
  return (
    <div>
      checkPath
      <div></div>
    </div>
  );
}
