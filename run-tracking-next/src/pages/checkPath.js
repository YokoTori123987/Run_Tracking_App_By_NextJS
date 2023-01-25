import React from "react";
import { gql, useMutation, useQuery } from "@apollo/client";
import { useState } from "react";
import { Select } from "antd";
import { QrReader } from "react-qr-reader";
// import {}
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
  const [parkId, setPark] = useState();
  const [checkpointId, setcheckpointId] = useState();
  const { loading, error, data } = useQuery(GET_CHECK_PATH_PAGE);
  const [checkRunning, { loading2, error2, data2 }] =
    useMutation(CHECK_RUNING_PATH);
  if (loading) return "Loading...";
  if (error) return `Error! ${error.message}`;
  if (loading2) return "Loading...";
  if (error2) return `Error! ${error.message}`;
  const parkOption = data.parks.map((data) => ({
    value: data.id,
    label: data.name,
  }));
  console.log(data2);
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
    console.log(e);
    setcheckpointId(e);
  };
  // console.log(data);
  return (
    <div>
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
                  width: "25%",
                  height: "25%",
                  border: "3px solid black",
                }}
              >
                <QrReader
                  key={checkpointId}
                  // ref={qrRef}
                  // scanDelay={5000}
                  // onError={webcamError}
                  // onScan={webcamScan}
                  legacyMode={false}
                  facingMode={"environment"}
                  onResult={(result) => {
                    console.log(checkpointId);
                    if (result) {
                      // setWebcamResult(result?.text)
                      // console.log(result)
                      const userId = result.text;
                      // flyToCheckpoint(userId)
                      // console.log(checkpointId + ' +++ ' + userId)
                      checkRunning({
                        variables: { userId, checkpointId },
                      });
                    }

                    // if (error) {
                    //   console.info(error)
                    // }
                  }}
                />
              </div>
              <div className="card-footer mb-1 rounded text-center  ">
                {/* <h6>WebCam Result: {userId}</h6> */}
                <h6>{checkpointId + " / " + userId}</h6>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}