import { gql, useQuery, useMutation } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { Card, Button, Modal, Form, Input } from "antd";
import { useUserAuth } from "../context/UserAuthContext";
import { useRouter } from "next/router";
// import Router from "next/router";

// const GET_UUSER = gql`
//   query GetUser {
//     users {
//       id
//       firstName
//     }
//   }
// `;

const CREATE_ACCOUNT_USER = gql`
  # Increments a back-end counter and gets its resulting value
  mutation createAccountUser($phoneNumberuuid: String, $phoneNumber: String) {
    createUser(phoneNumberuuid: $phoneNumberuuid, phoneNumber: $phoneNumber)
  }
`;

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
  const [createUser, { loading, error }] = useMutation(CREATE_ACCOUNT_USER);
  const { verifyOtpSignup, setUpRecaptha } = useUserAuth();
  const [open, setOpen] = useState(false);
  const [otp, setotp] = useState(false);
  const [changesOTP, setChangeOTP] = useState(null);
  const [confirmResult, setConfirmResult] = useState(null);
  const [number, setNumber] = useState(null);
  const router = useRouter();
  const showModal = () => {
    setOpen(true);
  };
  // console.log(currentuser + " dwadawdawdaw");
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
    // ใส่ตัวเลข otp ลงในช่อง
    setChangeOTP(e.target.value);
  };
  const confirmOTP = async () => {
    // ส่งข้อมูลตัวแปล confirmResult ตัวเลข otp ของ firebase , changesOTP ตัวเลข otp ของที่เรากรอก
    const useruid = await verifyOtpSignup(confirmResult, changesOTP);
    createUser({
      variables: { phoneNumber: number, phoneNumberuuid: useruid },
    });
    router.push("/");
  };
  const onsignInSumit = async (e) => {
    const phoneNumber = "+66" + e.PhoneNumber;
    // const result = await setUpRecaptha(phoneNumber)
    
    await setUpRecaptha(phoneNumber)
      .then((res) => {
        setConfirmResult(res);
        setotp(true);
        setNumber(e.PhoneNumber);
      })
      .catch((err) => {
        console.log(err + " / " + "ได้มีการสมัครด้วยเบอร์นี้ไปแล้ว");
      });
  };

  const [activeTabKey2, setActiveTabKey2] = useState("article");
  const onTab2Change = (key) => {
    setActiveTabKey2(key);
  };

  if (loading) return "Loading...";
  if (error) return `Error! ${error.message}`;
  // console.log(window.recaptchaVerifier);
  return (
    <>
      <div>signup</div>
      <Card
        style={{
          width: "50%",
        }}
        tabList={tabListNoTitle}
        activeTabKey={activeTabKey2}
        onTabChange={(key) => {
          onTab2Change(key);
          // console.log(key);
        }}
      >
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
          autoComplete="off"
        >
          <Form.Item
            label="PhoneNumber"
            name="PhoneNumber"
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
              onClick={confirmOTP}
              htmlType="submit"
              // id="recaptcha-container"
            >
              Submit
            </Button>
          </>
        )}
      </Modal>
    </>
  );
}
