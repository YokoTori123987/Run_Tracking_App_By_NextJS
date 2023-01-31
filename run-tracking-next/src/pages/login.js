import React, { useState } from "react";
import Link from "next/link";
import { PhoneOutlined, MailOutlined } from "@ant-design/icons";
import { useUserAuth } from "../context/UserAuthContext";
import {
  Button,
  Checkbox,
  Form,
  Input,
  Card,
  Image,
  Row,
  Col,
  Modal,
} from "antd";


const handleCancel = () => {
  setIsModalOpen(false);
  };

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
      <Row>
        <Col
          xs={{ span: 24 }}
          lg={{ span: 8, push: 8 }}
          style={{ padding: "20px", marginBottom: "20" }}
        >
          <Card
            className="items-center justify-center px-8 py-2 text-center"
            style={{
              padding: "20px",
              //  display: "center",
              boxShadow: "0 0 3px 2px #cec7c759",
              borderRadius: 20,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div
              style={{
                padding: 60,
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Image.PreviewGroup>
                <Image width={200} src="https://race.thai.run/logonews.png" />
              </Image.PreviewGroup>
            </div>
            <Form
              name="basic"
              labelCol={{
                span: 24,
              }}
              wrapperCol={{
                span: 18,
              }}
              initialValues={{
                remember: true,
              }}
              onFinish={onsignInSumit}
              // onFinishFailed={"onFinishFailed"}
              autoComplete="off"
            >
              <Form.Item
                labelCol={{
                  span: 8,
                }}
                label="เบอร์โทรศัพท์"
                name="PhoneNumber"
                rules={[
                  {
                    required: true,
                    message: "กรุณากรอกเบอร์โทรศัพท์!",
                  },
                ]}
              >
                <Input
                  style={{ width: 250 }}
                  type="text"
                  prefix={<PhoneOutlined />}
                  placeholder="+66"
                  size="large"
                />
              </Form.Item>

              {otp && (
                <>
                  <Modal
                    title="กรอกรหัส OTP "
                    open={open}
                    okButtonProps={{ style: { display: "none" } }}
                    cancelButtonProps={{ style: { display: "none" } }}
                    onCancel={handleCancel}
                  >
                    <Input.Group compact>
                      <Input
                        onChange={changeOTP}
                        style={{ width: 190}}
                        prefix={
                          <MailOutlined className="site-form-item-icon" />
                        }
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
                  </Modal>
                </>
              )}

              <div
                style={{
                  margin: "auto",
                  textAlign: "center",
                  padding: 5,
                }}
              >
                <Button
                  type="primary"
                  htmlType="submit"
                  id="recaptcha-container"
                  shape="round"
                  size="large"
                >
                  เข้าสู่ระบบ
                </Button>
              </div>

              <div
                style={{ textAlign: "center", marginBottom: 2, padding: 10 }}
              >
                หรือ
              </div>
              <Link style={{ textAlign: "center" }} href="/signup">
                <p>ลงทะเบียน</p>
              </Link>
            </Form>
          </Card>
        </Col>
      </Row>
    </>
  );
}
