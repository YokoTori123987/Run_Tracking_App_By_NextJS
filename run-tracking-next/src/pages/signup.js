import { gql, useQuery } from "@apollo/client";
import React from "react";
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
  function onCaptchVerify() {
    window.recaptchaVerifier = new RecaptchaVerifier(
      "recaptcha-container",
      {
        size: "normal",
        callback: (response) => {
          // reCAPTCHA solved, allow signInWithPhoneNumber.
          // ...
        },
        "expired-callback": () => {
          // Response expired. Ask user to solve reCAPTCHA again.
          // ...
        },
      },
      auth
    );
  }
  function onSignInSubmit() {
    const phoneNumber = getPhoneNumberFromUserInput();
    const appVerifier = window.recaptchaVerifier;
    signInWithPhoneNumber(auth, phoneNumber, appVerifier)
      .then((confirmationResult) => {
        // SMS sent. Prompt user to type the code from the message, then sign the
        // user in with confirmationResult.confirm(code).
        window.confirmationResult = confirmationResult;
        // ...
      })
      .catch((error) => {
        // Error; SMS not sent
        // ...
      });
  }
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
        {console.log(activeTabKey2)}
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
          onFinish={"onFinish"}
          onFinishFailed={"onFinishFailed"}
          autoComplete="off"
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
        </Form>
      </Modal>
      {data.users.map((user) => (
        <div key={user.id}>
          <h1>{user.firstName}</h1>
        </div>
      ))}
    </>
  );
}
