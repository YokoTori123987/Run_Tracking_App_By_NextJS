import React, { useState } from "react";
import Link from "next/link";
import { useUserAuth } from "../context/UserAuthContext";
import { Button, Form, Input } from "antd";
export default function Login() {
  const { verifyOtpLogin, setUpRecaptha } = useUserAuth();
  const [changesOTP, setChangeOTP] = useState(null);
  const [confirmResult, setConfirmResult] = useState(null);
  const [otp, setotp] = useState(false);
  const onsignInSumit = async (e) => {
    const phoneNumber = "+66" + e.PhoneNumber;
    const result = await setUpRecaptha(phoneNumber);
    setConfirmResult(result);
    setotp(true);
  };
  const changeOTP = (e) => {
    // ใส่ตัวเลข otp ลงในช่อง
    setChangeOTP(e.target.value);
  };
  const confirmOTP = async () => {
    // ส่งข้อมูลตัวแปล confirmResult ตัวเลข otp ของ firebase , changesOTP ตัวเลข otp ของที่เรากรอก
    await verifyOtpLogin(confirmResult, changesOTP);
  };
  return (
    <>
      <div>login</div>
      <Link href="/signup">signup</Link>
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
    </>
  );
}
