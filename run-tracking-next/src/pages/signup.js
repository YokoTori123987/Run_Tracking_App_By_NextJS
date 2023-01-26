import { gql, useQuery, useMutation } from "@apollo/client";
import React, { useEffect, useRef, useState } from "react";
import { Card, Button, Modal, Form, Input } from "antd";
import { useUserAuth } from "../context/UserAuthContext";
import { QrReader } from "react-qr-reader";
import { useRouter } from "next/router";

const QUERY = gql`
  query GetUser($id: String!) {
    user(id: $id) {
      id
      firstName
      lastName
      email
      phoneNumber
    }
  }
`;

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

export default function Signup() {
  const Router = new useRouter()
  const [createUser, { data, loading, error }] =
    useMutation(CREATE_ACCOUNT_USER);
  const { createPhoneUser, senduser, verifyOtpSignup, setUpRecaptha } = useUserAuth();
  const [open, setOpen] = useState(false);
  const [otp, setotp] = useState(false);
  const [userId, setUserId] = useState("");
  const [changesOTP, setChangeOTP] = useState(null);
  const [confirmResult, setConfirmResult] = useState(null);
  const [number, setNumber] = useState(null);
  const showModal = () => {
    setOpen(true);
  };
  const scanRef = useRef(null)

  const { loading: loding2, error: errror2, data: data2, refetch } = useQuery(QUERY, { skip: true, });
  if (loading) return "Loading...";
  if (error) return `Error! ${error.message}`;
  console.log(data2)

  const handleScan = async (result) => {
    // console.log(scanRef)
    if (!result) return;
    // setUserId(result?.text)
    if (result?.text === scanRef.current) return;
    scanRef.current = result?.text
    // setUserId(result?.text)
    console.log(result?.text)
    // console.log(userId)
    if (result) {
      setUserId(result.text)
      refetch({ id: result.text })
        .then((res) => {
          setUserId(res.data.user.id)
          if (res.data.user.email) {
            Modal.error({
              title: 'มีข้อมูลอยู่ในฐานข้อมูล',
              content: 'ไอดีนี้ถูกกรอกข้อมูลแล้ว',
            });
            Router.push('/')
          } else if (res.data.user.email === null) {
            Modal.info({
              title: 'This is a notification message',
              content: (
                <div>
                  <p>กรุณากรอกข้อมูลของท่าน</p>
                </div>
              ),
              onOk() { },
            });
            Router.push('/signup/' + result.text)
          }
          console.log(res)
        })
    }
  }


  // console.log(currentuser + " dwadawdawdaw");
  const contentListNoTitle = {
    article: (
      <>
        <Button>Mail</Button>
        <Button onClick={showModal}>สมัครด้วยเบอร์โทร</Button>
      </>
    ),
    app: <>
      <div class="qrcode">
        <QrReader
          style={{ width: '100%' }}
          ref={scanRef}
          onResult={handleScan}
          constraints={{
            facingMode: 'environment'
          }}
        />
      </div>
    </>,
  };
  const changeOTP = (e) => {
    // ใส่ตัวเลข otp ลงในช่อง
    setChangeOTP(e.target.value);
  };
  const confirmOTP = async () => {
    // ส่งข้อมูลตัวแปล confirmResult ตัวเลข otp ของ firebase , changesOTP ตัวเลข otp ของที่เรากรอก
    const numberuuid = await verifyOtpSignup(confirmResult, changesOTP);
    // console.log(number);
    await createPhoneUser(number);
    const data = senduser();
    console.log(data);
    createUser({
      variables: { phoneNumber: number, PhoneNumberuuid: numberuuid },
    });
  };
  const onsignInSumit = async (e) => {
    const phoneNumber = "+66" + e.PhoneNumber;
    const result = await setUpRecaptha(phoneNumber);
    setNumber(e.PhoneNumber);
    setConfirmResult(result);
    setotp(true);
  };
  const [activeTabKey2, setActiveTabKey2] = useState("article");
  const onTab2Change = (key) => {
    setActiveTabKey2(key);
  };

  // if (loading) return "Loading...";
  // if (error) return `Error! ${error.message}`;
  // console.log(window.recaptchaVerifier);



  return (
    <>
      <div>
        <div>signup</div>
        <Card
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
          class="cardSignup"
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
      </div>
    </>
  );
}