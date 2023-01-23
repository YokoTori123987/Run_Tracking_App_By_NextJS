import { gql, useQuery } from "@apollo/client";
import React, { useEffect } from "react";
import { Card, Button, Modal, Form, Input } from "antd";
import { useState } from "react";
// import Link from "next/link";
import app from "../components/firebase_config";
import {
  getAuth,
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from "firebase/auth";
const GET_UUSER = gql`
  query GetUser {
    users {
      id
      firstName
    }
  }
`;
const auth = getAuth();

// const tabList = [
//   {
//     key: "tab1",
//     tab: "tab1",
//   },
//   {
//     key: "tab2",
//     tab: "tab2",
//   },
// ];
// const contentList = {
//   tab1: <p>content1</p>,
//   tab2: <p>content2</p>,
// };
const tabListNoTitle = [
  {
    key: "article",
    tab: "สมัคร",
  },
  {
    key: "app",
    tab: "สมัครด้วย QRCode",
  },
];

export default function signup() {
  const [open, setOpen] = useState(false);
  const [otp, setotp] = useState(false);
  const [changesOTP, setChangeOTP] = useState(null);
  const [confirmResult, setConfirmResult] = useState(null);
  const showModal = () => {
    setOpen(true);
  };
  const contentListNoTitle = {
    article: (
      <>
        <Button>Mail</Button>
        <Button onClick={showModal}>สมัครด้วยเบอร์โทร</Button>
      </>
    ),
    app: <p>app content</p>,
  };
  const changeOTP = (e) => {
    console.log(e);
    setChangeOTP(e.target.value);
  };
  const ooo = () => {
    // ส่งค่า otp ไปให้ firebase เพื่อยื่นยันความถูกต้องของ otp
    // changesOTP
    confirmResult
      .confirm(changesOTP)
      .then((result) => {
        // User signed in successfully.
        const user = result.user;
        // ...
        console.log(user);
      })
      .catch((error) => {
        console.log(error);
        // User couldn't sign in (bad verification changesOTP?)
        // ...
      });
  };
  const setUpRecaptcha = () => {
    // window.recaptchaVerifier = new RecaptchaVerifier(
    return new RecaptchaVerifier(
      "recaptcha-container",
      {
        size: "invisible",
        // callback: (response) => {
        //   // reCAPTCHA solved, allow signInWithPhoneNumber.
        //   // onSignInSubmit();
        //   console.log("Created");
        // },
      },
      auth
    );
  };
  const onsignInSumit = () => {
    // e.preventDefault();
    console.log("dawdwadawd");
    const appVerifier = setUpRecaptcha();
    // console.log(recap);
    const phoneNumber = "+66910356938";
    // var phoneNumber = getPhoneNumberFromUserInput();
    console.log(appVerifier + " - phonenumber " + phoneNumber);
    signInWithPhoneNumber(auth, phoneNumber, appVerifier)
      .then((confirmationResult) => {
        // SMS sent. Prompt user to type the code from the message, then sign the
        // user in with confirmationResult.confirm(code).
        // window.confirmationResult = confirmationResult;
        console.log(confirmationResult);
        if (confirmationResult) {
          setotp(true);
          setConfirmResult(confirmationResult);
        }
        // ...
      })
      .catch((error) => {
        // Error; SMS not sent
        // ...
      });
    // app
    // .auth()
    // .signInWithPhoneNumber(phoneNumber, appVerifier)
    // .then(function (confirmationResult) {
    // window.confirmationResult = confirmationResult;
    // console.log(window.confirmationResult);
    // const code = getCodeFromUserInput();
    // confirmationResult
    //   .confirm(code)
    //   .then((result) => {
    //     // User signed in successfully.
    //     const user = result.user;
    //     // ...
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //     // User couldn't sign in (bad verification code?)
    //     // ...
    //   });
    // })
    // .catch(function (error) {
    //   console.log(error);
    // });
  };
  // useEffect(() => {
  //   if (window.confirmationResult) {
  //     setotp(true);
  //     // console.log(first);
  //   }
  // }, []);
  // const [activeTabKey1, setActiveTabKey1] = useState("tab1");
  const [activeTabKey2, setActiveTabKey2] = useState("article");
  // const onTab1Change = (key) => {
  //   setActiveTabKey1(key);
  // };
  const onTab2Change = (key) => {
    setActiveTabKey2(key);
  };
  const { loading, error, data } = useQuery(GET_UUSER);
  if (loading) return "Loading...";
  if (error) return `Error! ${error.message}`;
  console.log(window.recaptchaVerifier);
  return (
    <>
      <div>signup</div>
      {/* <Card
        style={{
          width: "100%",
        }}
        title="Card title"
        extra={<a href="#">More</a>}
        tabList={tabList}
        activeTabKey={activeTabKey1}
        onTabChange={(key) => {
          onTab1Change(key);
        }}
      >
        {contentList[activeTabKey1]}
      </Card>
      <br />
      <br /> */}
      <Card
        style={{
          width: "50%",
        }}
        tabList={tabListNoTitle}
        activeTabKey={activeTabKey2}
        // tabBarExtraContent={<a href="#">More</a>}
        onTabChange={(key) => {
          onTab2Change(key);
          console.log(key);
        }}
      >
        {/* {console.log(activeTabKey2)} */}
        {contentListNoTitle[activeTabKey2]}
      </Card>
      <Modal
        title="Title"
        open={open}
        okButtonProps={{ style: { display: "none" } }}
        cancelButtonProps={{ style: { display: "none" } }}
        onCancel={() => setOpen(false)}
      >
        <Form
          name="basic"
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 16,
          }}
          initialValues={{
            remember: true,
          }}
          onFinish={onsignInSumit}
          // onFinishFailed={"onFinishFailed"}
          // autoComplete="off"
        >
          <Form.Item
            label="Username"
            name="username"
            rules={[
              {
                required: true,
                message: "Please input your username!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit" id="recaptcha-container">
              Submit
            </Button>
          </Form.Item>
        </Form>
        {otp && (
          <>
            <input onChange={changeOTP} type="text" />
            <Button
              type="primary"
              onClick={ooo}
              htmlType="submit"
              id="recaptcha-container"
            >
              Submit
            </Button>
          </>
        )}
      </Modal>
      {data.users.map((user) => (
        <div key={user.id}>
          <h1>{user.firstName}</h1>
        </div>
      ))}
    </>
  );
}
