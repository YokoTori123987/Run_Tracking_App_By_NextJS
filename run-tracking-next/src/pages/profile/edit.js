import { gql, useQuery, useMutation } from "@apollo/client";
import { useRouter } from "next/router"
import { Layout, Col, Row, Button, Form, Input } from "antd";
import { useUserAuth } from "../../context/UserAuthContext";
import style from "@/styles/editprofile.module.css"

// const MUTATION = gql`
//     mutation UpdateUser($updateUserId: String, $firstName: String, $lastName: String, $gender: String, $dateOfBirth: String, $imageUrl: String) {
//         updateUser(id: $updateUserId, firstName: $firstName, lastName: $lastName, gender: $gender, dateOfBirth: $dateOfBirth, imageUrl: $imageUrl) {
            
//         }
//     }
// `

export default function Edit() {

    const router = new useRouter();
    const { user } = useUserAuth();
    const { Content, Footer } = Layout;

    const contentStyle = {
        minHeight: 750,
        width: "100%",
    };

    const footerStyle = {
        textAlign: 'center',
        color: '#fff',
        backgroundColor: '#7f7f7f',
    };

    return (
        <>
            <Content style={contentStyle}>
                <div className={style.contentProfileEdit}>
                    <h1 className={style.headerProfileEdit}>
                        Profile
                    </h1>
                    <Row>
                        <Col xs={{ span: 24 }} lg={{ span: 8 }} style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                            <div>
                                <img src={user.imageUrl} className={style.imgProfileEdit} style={{ marginTop: "3%", marginBottom: "3%" }} />
                            </div>
                        </Col>
                        <Col xs={{ span: 24 }} lg={{ span: 16 }}>
                            <h3 style={{ fontSize: "20px" }} className={style.topicThree}> Personal Information </h3>
                            <Form
                                layout="horizontal"
                                onFinish={""}
                                style={{
                                    maxWidth: 500,
                                }}
                            >
                                <Form.Item label="FirstName" style={{ marginTop: "5%" }}>
                                    <Input />
                                </Form.Item>
                                <Form.Item label="LastName">
                                    <Input />
                                </Form.Item>
                                <Form.Item label="Gender">
                                    <Input />
                                </Form.Item>
                                <Form.Item label="Date Of Birth">
                                    <Input />
                                </Form.Item>
                            </Form>
                        </Col>
                    </Row>
                </div>
            </Content>

        </>
    )
}