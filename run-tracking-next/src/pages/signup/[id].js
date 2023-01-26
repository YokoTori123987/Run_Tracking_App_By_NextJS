import { Button, Layout, Form, Input, DatePicker, Select, Modal } from "antd"
import { gql, useMutation } from "@apollo/client";
import { useRouter } from "next/router";
import { useUserAuth } from "../../context/UserAuthContext";
import { useState } from "react";

export default function Signup() {

    const UPDATE_ACCOUNT_USER = gql`
        mutation updateUserQR($updateUserQrId: String, $firstName: String, $lastName: String, $email: String, $phoneNumber: String, $phoneNumberuuid: String, $gender: String, $dateOfBirth: String) {
            updateUserQR(id: $updateUserQrId, firstName: $firstName, lastName: $lastName, email: $email, phoneNumber: $phoneNumber, phoneNumberuuid: $phoneNumberuuid, gender: $gender, dateOfBirth: $dateOfBirth) {id}
        }
    `
    const router = new useRouter()
    const { id } = router.query
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { verifyOtpSignup, setUpRecaptha } = useUserAuth();
    const [number, setNumber] = useState(null);
    const [OTP, setOTP] = useState(null);
    const [confirmResult, setConfirmResult] = useState(null);
    const [ dataUser, SetDataUser ] = useState({});

    const changeOTP = (e) => {
        setOTP(e.target.value)
        // console.log(event)
    }

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const { Header, Content, Footer } = Layout

    const [updateUserQR] = useMutation(UPDATE_ACCOUNT_USER, {
        onCompleted: () => {
            Modal.success({
                content: 'สมัครเรียบร้อย',
            });
        }
    });

    const headerStyle = {
        textAlign: 'start',
        color: '#fff',
        height: 64,
        paddingInline: 50,
        lineHeight: '64px',
        backgroundColor: '#7f7f7f',
    };
    const contentStyle = {
        minHeight: 750,
        // lineHeight: '120px',
        display: "flex",
        justifyContent: "center",
        width: "100%",
    };
    const footerStyle = {
        textAlign: 'center',
        color: '#fff',
        backgroundColor: '#7dbcea',
    };

    const onFinish = async (data) => {
        // const sss = await updateUserQR({ variables: { updateUserQrId: id, firstName: data.firstName, lastName: data.lastName, email: data.email, phoneNumber: data.phoneNumber, gender: data.gender, dateOfBirth: data.dateOfBirth } })
        // console.log(sss, { data })
        // if (!sss.data.updateUserQR) {
            // return "ข้อมูลที่ถูกที่ถูกส่งล้มเหลว"
        // } else {
            /// ส่ง number ไปใช้ ฟั่งชัน opt
        SetDataUser(data);
        const phoneNumber = "+66" + data.phoneNumber;
        const result = await setUpRecaptha(phoneNumber);
        console.log(result);
        if (result) {
            setIsModalOpen(true);
            setConfirmResult(result);
        }

            /// ถ้า result error return เบอร์โทรไม่ถูกต้อง
        // }
        // const phoneNumber =  "+66" + data.phoneNumber;
        // const result = 
    }

    const confirmOTP = async () => {
        const data = dataUser
        const numberuuid = await verifyOtpSignup(confirmResult, OTP)
        // console.log(uid)
        const sss = await updateUserQR({ variables: { updateUserQrId: id, firstName: data.firstName, lastName: data.lastName, email: data.email, phoneNumber: data.phoneNumber, phoneNumberuuid: numberuuid, gender: data.gender, dateOfBirth: data.dateOfBirth } })

        // createUser({
        //     variables: { PhoneNumberuuid: numberuuid },
        //   });
        ///// ถ้าไม่มี uid ให้ error 
        ////ถ้ามีทำไร
        if (!numberuuid) {
            console.log("ไม่มี uid")
        } else {
            console.log("มี uid")
            router.push('/')
        }
    }

    return (
        <>
            <Header style={headerStyle} >
                <h1>Signup</h1>
            </Header>
            <Content style={contentStyle}>
                <Form
                    labelCol={{
                        span: 4,
                    }}
                    wrapperCol={{
                        span: 14,
                    }}
                    layout="horizontal"
                    // onValuesChange={onFormLayoutChange}
                    // disabled={componentDisabled}
                    onFinish={onFinish}
                    style={{
                        width: "800px",
                        margin: "50px",
                    }}>
                    <Form.Item label="FirstName" name="firstName"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your FirstName!',
                            },
                        ]}>
                        <Input />
                    </Form.Item>
                    <Form.Item label="LastName" name="lastName"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your LastName!',
                            },
                        ]}>
                        <Input />
                    </Form.Item>
                    <Form.Item label="Email" name="email"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your Email!',
                            },
                        ]}>
                        <Input />
                    </Form.Item>
                    <Form.Item label="PhoneNumber" name="phoneNumber"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your PhoneNumber!',
                            },
                        ]}>
                        <Input />
                    </Form.Item>
                    <Form.Item label="Gender" name="gender">
                        <Select>
                            <Select.Option value="Male">Male</Select.Option>
                            <Select.Option value="Female">Female</Select.Option>
                        </Select>
                    </Form.Item>
                    <Form.Item label="DateOfBirth" name="dateOfBirth"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your DateOfBirth!',
                            },
                        ]}>
                        <DatePicker />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">Submit</Button>
                    </Form.Item>
                </Form>
                <Modal title="Basic Modal"
                    open={isModalOpen}
                    onCancel={handleCancel}
                    okButtonProps={{ style: { display: "none" } }}
                    cancelButtonProps={{ style: { display: "none" } }}
                >
                    <input onChange={changeOTP} type="text" />
                    <Button
                        type="primary"
                        onClick={confirmOTP}
                        htmlType="submit"
                    >
                        Submit
                    </Button>
                </Modal>
            </Content>
            <div id="recaptcha-container"></div>
            <Footer style={footerStyle}>

            </Footer>
        </>
    )
}