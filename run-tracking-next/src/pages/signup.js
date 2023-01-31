import { gql, useQuery, useMutation } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { Card, Button, Modal, Form, Input, Col, Row } from "antd";
import { useUserAuth } from "../context/UserAuthContext";
import { useRouter } from "next/router";
import { PhoneOutlined, MailOutlined } from "@ant-design/icons";

// import Router from "next/router";

// const GET_UUSER = gql`
//   query GetUser {
//     users {
//       id
//       firstName
//     }
//   }
// `;

const handleCancel = () => {
  console.log("Clicked cancel button");
  setOpen(false);
};

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
      <div style={{ padding: 30 }}>
        <Button type="primary" shape="round" size="large">
          สมัครผ่าน Mail
        </Button>
        <br />
        <br />
        หรือ
        <br />
        <br />
        <Button type="primary" shape="round" size="large" onClick={showModal}>
          สมัครผ่านเบอร์โทรศัพท์
        </Button>
      </div>
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
      <br />
      <br />
      <Row>
        <Col xs={{ span: 20 }} lg={{ span: 8 }} style={{ margin: "auto" }}>
          <Card
            style={{
              textAlign: "center",
              paddingBottom: "20px",
              marginBottom: "40px",
              justify: "center",
              alignContent: "center",
              alignItems: "center",
            }}
            tabList={tabListNoTitle}
            activeTabKey={activeTabKey2}
            onTabChange={(key) => {
              onTab2Change(key);
              // console.log(key);
            }}
          >
            {contentListNoTitle[activeTabKey2]}
            <Modal
              title="สมัครผ่านเบอร์โทรศัพท์"
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
                <Input.Group compact>
                  <Form.Item
                    name="PhoneNumber"
                    rules={[
                      {
                        required: true,
                        message: "กรุณากรอกเบอร์โทรศัพท์ !",
                      },
                    ]}
                  >
                    <Input
                      prefix={<PhoneOutlined className="site-form-item-icon" />}
                      placeholder="+66"
                      size="large"
                      type="text"
                    />
                  </Form.Item>
                  <Button
                    type="primary"
                    htmlType="submit"
                    id="recaptcha-container"
                    size="large"
                  >
                    ส่ง OTP
                  </Button>
                </Input.Group>
              </Form>

              {otp && (
                <Input.Group compact>
                  <Input
                      labelCol={{
                      span: 8,
                    }}
                    onChange={changeOTP}
                    style={{ width: 190, padding: "auto" }}
                    prefix={<MailOutlined className="site-form-item-icon" />}
                    placeholder="ใส่รหัส OTP ที่นี่"
                    type="text"
                    maxlength="6"
                    size="large"
                  />
                  <Button
                    type="primary"
                    onClick={confirmOTP}
                    htmlType="submit"
                    size="large"
                  >
                    ยืนยัน OTP
                  </Button>
                </Input.Group>
              )}
            </Modal>
          </Card>
        </Col>
      </Row>
    </>
  );
}
