import React from "react";
import { Button } from "antd";
export default function CheckNFT() {
  const scanButton = async() => {
    console.log("User clicked scan button");
    try {
      const ndef = new NDEFReader();
      await ndef.scan();
      console.log("> Scan started");

      ndef.addEventListener("readingerror", () => {
        alert("Argh! Cannot read data from the NFC tag. Try another one?")
        console.log("Argh! Cannot read data from the NFC tag. Try another one?");
      });

      ndef.addEventListener("reading", ({ message, serialNumber }) => {
        alert(`> Serial Number: ${serialNumber}`)
        alert(`> Records: (${message.records.length})`)
        console.log(`> Serial Number: ${serialNumber}`);
        console.log(`> Records: (${message.records.length})`);
      });
    } catch (error) {
      console.log("Argh! " + error);
    }
  }

  //   writeButton.addEventListener("click", async () => {
  //     log("User clicked write button");

  //     try {
  //       const ndef = new NDEFReader();
  //       await ndef.write("Hello world!");
  //       log("> Message written");
  //     } catch (error) {
  //       log("Argh! " + error);
  //     }
  //   });

  //   makeReadOnlyButton.addEventListener("click", async () => {
  //     log("User clicked make read-only button");

  //     try {
  //       const ndef = new NDEFReader();
  //       await ndef.makeReadOnly();
  //       log("> NFC tag has been made permanently read-only");
  //     } catch (error) {
  //       log("Argh! " + error);
  //     }
  //   });
  return (
    <>
      <Button onClick={() => scanButton()}>Scan</Button>
    </>
  );
}
