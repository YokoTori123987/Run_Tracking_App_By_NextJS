import { gql, useMutation } from "@apollo/client";
import { useRouter } from "next/router"
import { Layout, Col, Row, Button, Form, Input, Select, DatePicker } from "antd";
import { useUserAuth } from "../../context/UserAuthContext";
import style from "@/styles/editprofile.module.css"
import { useState, useEffect } from "react";

const UPDATE_USER_PROFILE = gql`
    mutation Mutation($updateUserId: String, $firstName: String, $lastName: String, $gender: String) {
        updateUser(id: $updateUserId, firstName: $firstName, lastName: $lastName, gender: $gender) {
            id
        }
    }
`

export default function Edit() {

    const router = new useRouter();
    const { user } = useUserAuth();
    const { Content, Footer } = Layout;
    const [updateUser] = useMutation(UPDATE_USER_PROFILE);

    const contentStyle = {
        minHeight: 750,
        marginTop: "2%",
    };

    const footerStyle = {
        textAlign: 'center',
        color: '#fff',
        backgroundColor: '#7f7f7f',
    };

    const onFinish = (e) => {
        updateUser({
            variables: { updateUserId: user.id, firstName: e.firstName, lastName: e.lastName, gender: e.gender }
        })
    }

    // if (loading) return "Loading...";
    // if (error) return `Error! ${error.message}`;
    // console.log(user,'user')

    return (
        <>
            <Content style={contentStyle}>
                <div className={style.contentProfileEdit}>
                    <h1 className={style.headerProfileEdit}>
                        Profile
                    </h1>
                    {console.log(user.lastName, 'user2')}

                    <Row>
                        <Col xs={{ span: 24 }} lg={{ span: 8 }} style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                            <div>
                                <img src={user.imageUrl} className={style.imgProfileEdit} style={{ marginTop: "3%", marginBottom: "3%" }} />
                            </div>
                        </Col>
                        <Col xs={{ span: 24 }} lg={{ span: 16 }}>
                            <h3 style={{ fontSize: "20px" }} className={style.topicThree}> Personal Information </h3>
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
                                className={style.formInput}
                            >
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
                                    // initialValue={`${user && user.lastName}`}
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please input your LastName!',
                                        },
                                    ]}
                                >
                                    <Input />
                                </Form.Item>
                                <Form.Item label="Gender" name="gender">
                                    <Select>
                                        <Select.Option value="Male">Male</Select.Option>
                                        <Select.Option value="Female">Female</Select.Option>
                                    </Select>
                                </Form.Item>
                                <Form.Item>
                                    <Button type="primary" htmlType="submit">
                                        Submit
                                    </Button>
                                </Form.Item>
                            </Form>
                        </Col>
                    </Row>
                </div>
            </Content>

        </>
    )
}