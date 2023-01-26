import { useRouter } from "next/router"
import { useQuery, gql } from "@apollo/client"
import { Col, Row, Layout, Card } from "antd"
import { useUserAuth } from "../../context/UserAuthContext";

export default function Statistic() {

    const router = new useRouter
    const { id } = router.query
    const { Header, Footer, Content } = Layout;
    const { user } = useUserAuth();

    const QUERY = gql`
        query FindUserId($id: String!) {
            user(id: $id) {
                id
                firstName
                lastName
                email
                phoneNumber
                dateOfBirth
                bib
                Run {
                    id
                    pace
                }
            }
        }
    `
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
    };
    const footerStyle = {
        textAlign: 'center',
        color: '#fff',
        backgroundColor: '#7dbcea',
    };

    const {data, loading} = useQuery(QUERY, {
        variables: { id: id }
    })
    // console.log(loading);

    if(loading) {
        return <p>loading</p>
    }
    // console.log(data)

    // console.log(data.user.Run, "ssss")
    // console.log(user, 'aaaa')

    // const run = data.user.Run

    return (
        <>
            <Header style={headerStyle}>
                <h1>Statistic</h1>
            </Header>
            <Content style={contentStyle}>
                <Row>
                    <Col xs={{ span: 24 }} lg={{ span: 6 }} style={{ display: "flex", flexDirection: "column", marginTop: "30px", alignItems: "center" }}>
                        <h2 style={{ marginBottom: "20px" }}>Profile</h2>
                        <img src="https://th.bing.com/th/id/R.f81936ad509f82c43bc17a903c8a1bf0?rik=GLun8UNuhTh1dQ&riu=http%3a%2f%2fwww.blognone.com%2fsites%2fdefault%2ffiles%2fnews-thumbnails%2fDoraemon.PNG%3f1346647979&ehk=ddjyAxlHrJLxQMSjSgoj7j7Vz4ZWCvUo6%2fIVo4qsHX0%3d&risl=&pid=ImgRaw&r=0&sres=1&sresct=1" class='imgprofile' />
                        <div style={{ paddingTop: "30px" }}>
                            <h5>BIB : {data.user.bib}</h5>
                            <h5>Name : {data.user.firstName} {data.user.lastName}</h5>
                            <h5>Phone : {data.user.phoneNumber}</h5>
                            <h5>Email : {data.user.email}</h5>
                            <h5>Birth Day : {data.user.dateOfBirth}</h5>
                        </div>
                    </Col>
                    <Col xs={{ span: 24 }} lg={{ span: 18 }}>
                        <div style={{ marginTop: "40px" }}>
                            <Card title="Recent activity" bordered={false} style={{ margin: "40px" }} extra={<a href="#">History</a>}>
                                {/* หัวข้อการวิ่ง */}
                                <Row>
                                    <Col xs={{ span: 6, offset: 2 }} lg={{ span: 6, offset: 2 }}>
                                        <h4>AVG.PACE</h4>
                                    </Col>
                                    <Col xs={{ span: 6, offset: 2 }} lg={{ span: 6, offset: 2 }}>
                                        <h4>DISTANCE</h4>
                                    </Col>
                                    <Col xs={{ span: 6, offset: 2 }} lg={{ span: 6, offset: 2 }}>
                                        <h4>TIME</h4>
                                    </Col>
                                </Row>
                                {/* ข้อมูลการวิ่ง */}
                                <Row>
                                    <Col xs={{ span: 6, offset: 2 }} lg={{ span: 6, offset: 2 }}>
                                        <h4>
                                            {data.user.Run.map((run) => {
                                                return (
                                                    <div>
                                                        {run.pace}
                                                    </div>
                                                )
                                            })}
                                        </h4>
                                    </Col>
                                    <Col xs={{ span: 6, offset: 2 }} lg={{ span: 6, offset: 2 }}>
                                        <h4>10 k.m</h4>
                                    </Col>
                                    <Col xs={{ span: 6, offset: 2 }} lg={{ span: 6, offset: 2 }}>
                                        <h4>00:00 m</h4>
                                    </Col>
                                </Row>
                            </Card>
                        </div>
                        <div style={{ marginTop: "40px" }}>
                            <Card title="My statistics" bordered={false} style={{ margin: "40px" }}>
                                {/* หัวข้อการวิ่ง */}
                                <Row>
                                    <Col xs={{ span: 6, offset: 2 }} lg={{ span: 6, offset: 2 }}>
                                        <h4>BEST PACE</h4>
                                    </Col>
                                    <Col xs={{ span: 6, offset: 2 }} lg={{ span: 6, offset: 2 }}>
                                        <h4>BEST DISTANCE</h4>
                                    </Col>
                                    <Col xs={{ span: 6, offset: 2 }} lg={{ span: 6, offset: 2 }}>
                                        <h4>BEST TIME</h4>
                                    </Col>
                                </Row>
                                {/* ข้อมูลการวิ่ง */}
                                <Row>
                                    <Col xs={{ span: 6, offset: 2 }} lg={{ span: 6, offset: 2 }}>
                                        <h4>07:00</h4>
                                    </Col>
                                    <Col xs={{ span: 6, offset: 2 }} lg={{ span: 6, offset: 2 }}>
                                        <h4>10 k.m</h4>
                                    </Col>
                                    <Col xs={{ span: 6, offset: 2 }} lg={{ span: 6, offset: 2 }}>
                                        <h4>00:00 m</h4>
                                    </Col>
                                </Row>
                            </Card>
                        </div>
                        <div style={{ marginTop: "40px" }}>
                            <Card title="Recent activity" bordered={false} style={{ margin: "40px" }} extra={<a href="#">History</a>}>
                                {/* หัวข้อการวิ่ง */}
                                <Row>
                                    <Col xs={{ span: 4, offset: 2 }} lg={{ span: 4, offset: 2 }}>
                                        <h4>PARK</h4>
                                    </Col>
                                    <Col xs={{ span: 4, offset: 2 }} lg={{ span: 4, offset: 2 }}>
                                        <h4>DISTANCE</h4>
                                    </Col>
                                    <Col xs={{ span: 4, offset: 2 }} lg={{ span: 4, offset: 2 }}>
                                        <h4>TIME</h4>
                                    </Col>
                                    <Col xs={{ span: 4, offset: 2 }} lg={{ span: 4, offset: 2 }}>
                                        <h4>ROUND</h4>
                                    </Col>
                                </Row>
                                {/* ข้อมูลการวิ่ง */}
                                <Row>
                                    <Col xs={{ span: 4, offset: 2 }} lg={{ span: 4, offset: 2 }}>
                                        <h4>สนาม</h4>
                                    </Col>
                                    <Col xs={{ span: 4, offset: 2 }} lg={{ span: 4, offset: 2 }}>
                                        <h4>10 k.m</h4>
                                    </Col>
                                    <Col xs={{ span: 4, offset: 2 }} lg={{ span: 4, offset: 2 }}>
                                        <h4>00:00 m</h4>
                                    </Col>
                                    <Col xs={{ span: 4, offset: 2 }} lg={{ span: 4, offset: 2 }}>
                                        <h4>2</h4>
                                    </Col>
                                </Row>
                            </Card>
                        </div>
                    </Col>
                </Row>
            </Content>
            <Footer style={footerStyle}>

            </Footer>
        </>
    )
}