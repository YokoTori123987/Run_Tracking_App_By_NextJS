import React from "react";
import { gql, useMutation, useQuery } from "@apollo/client";
import { useState,useRef } from "react";
import { Select, notification } from "antd";
import { QrReader } from "react-qr-reader";

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
const CHECK_RUNING_PATH = gql`
  mutation createCheckpointMutation($userId: String!, $checkpointId: String!) {
    checkRunning(userId: $userId, checkpointId: $checkpointId)
  }
`;
export default function checkPath() {
  let userId;
  const scanRef = useRef(null)
  const [api, contextHolder] = notification.useNotification();
  const [parkId, setPark] = useState();
  const [checkpointId, setcheckpointId] = useState();
  const { loading, error, data } = useQuery(GET_CHECK_PATH_PAGE);
  const [checkRunning] = useMutation(CHECK_RUNING_PATH, {
    onCompleted: (res) => {
      // console.log(res);
      console.log(res);
      api.info({
        message: res.checkRunning,
        duration: 2,
        placement: "top",
      });
    },
    onError: (error) => {
      api.info({
        message: error.checkRunning,
        duration: 2,
        placement: "top",
      });
    },
  });
  if (loading) return "Loading...";
  if (error) return `Error! ${error.message}`;
  const parkOption = data.parks.map((data) => ({
    value: data.id,
    label: data.name,
  }));

  const handleChangePark = async (e) => {
    setPark(e);
  };
  const text = data.parks.find((scanId) => scanId.id === parkId);
  let checkpointOption;
  if (text) {
    checkpointOption = text.Checkpoint.map((data) => ({
      value: data.id,
      label: data.name,
    }));
  }
  const handleCheckpoint = (e) => {
    // console.log(e);
    setcheckpointId(e);
  };
  const handleScan = async(result) => {
    if (!result) return;
    if (result?.text === scanRef.current) return;
    scanRef.current = result?.text
// {(result) => {
  if (result) {
    const userId = result.text;
    checkRunning({
      variables: { userId, checkpointId },
    });
  }
  if (error) {
    console.info(error);
  }

//   // if (error) {
//   //   console.info(error)
//   // }
// }}
  }
  return (
    <div>
      {contextHolder}
      checkPath
      <div>
        <Select
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          options={parkOption}
          onChange={handleChangePark}
        />
        {parkId && (
          <>
            <h5
              name="parkId"
              className="rw-label"
              errorClassName="rw-label rw-label-error"
            >
              Checkpoint Name
            </h5>
            <Select
              className="rw-input"
              errorClassName="rw-input rw-input-error"
              options={checkpointOption}
              onChange={handleCheckpoint}
            />
          </>
        )}
        {checkpointId && (
          <>
            <div className="card col-sm-4">
              <div className="card-header m-1 rounded text-center">
                <h3>Webcam Image</h3>
              </div>
              <div
                className="card-body text-center"
                style={{
                  margin: "auto",
                  width: "50%",
                  height: "50%",
                  border: "3px solid black",
                }}
              >
                <QrReader
                  key={checkpointId}
                  // ref={qrRef}
                  // scanDelay="500"
                  ref={scanRef}
                  legacyMode={false}
                  constraints={{
                    facingMode: 'environment'
                  }}
                  onResult={handleScan}
                />
              </div>
              <div className="card-footer mb-1 rounded text-center  ">
                <h6>{checkpointId + " / " + userId}</h6>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}