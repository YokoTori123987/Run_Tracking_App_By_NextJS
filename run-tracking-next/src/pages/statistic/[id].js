import { useRouter } from "next/router"
import { useQuery, gql } from "@apollo/client"
import { Col, Row, Layout, Card, Button, Image } from "antd"
import { useUserAuth } from "../../context/UserAuthContext";
import moment, { duration } from "moment"
// import 'moment/locale/th'
// moment.locale('th')

export default function Statistic() {

    const router = new useRouter()
    const { id } = router.query
    const { Header, Footer, Content } = Layout;

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
                runsHistory {
                    id
                }
            }
        }
    `

    const QUERY2 = gql`
        query FindCurrentUser($userId: String!) {
            currentRun(userId: $userId) {
                id
                pace
                distance
                startTime
                stopTime
                park {
                    id
                    name
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

    const { data, loading, error } = useQuery(QUERY, {
        variables: { id: id }
    })

    // console.log(loading);

    const { data: data2, loading: loding2, error: error2 } = useQuery(QUERY2, {
        variables: { userId: id }
    })

    if (loading) {
        return <p>loading</p>
    }
    if (error) {
        return error("ไม่มีข้อมูล")
    }

    let Activity = data?.user?.runsHistory.length;

    const historyByID = id;

    const startTime = moment(data2?.currentRun?.startTime).format("YYYY-MM-DD HH:mm:ss");
    const stopTime = moment(data2?.currentRun?.stopTime).format("YYYY-MM-DD HH:mm:ss");

    // console.log(a)
    // console.log(b)

    const duration = moment.duration(moment(stopTime).diff(moment(startTime)))
    // console.log(duration)

    const day = duration.days() * 24
    // console.log(duration.hours()+ day + "hours and" + duration.minutes() + "minutes");

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
                        <div style={{ paddingTop: "25px" }}>
                            <h4 style={{ paddingTop: "10px", textAlign: "start" }}>BIB : {data?.user?.bib}</h4>
                            <h4 style={{ paddingTop: "10px", textAlign: "start" }}>Name : {data?.user?.firstName} {data?.user?.lastName}</h4>
                            <h4 style={{ paddingTop: "10px", textAlign: "start" }}>Phone : {data?.user?.phoneNumber}</h4>
                            <h4 style={{ paddingTop: "10px", textAlign: "start" }}>Email : {data?.user?.email}</h4>
                            <h4 style={{ paddingTop: "10px", textAlign: "start" }}>Birthday :  {moment(data?.user?.dateOfBirth).format('LL')}</h4>
                            {/* {moment(data?.user?.dateOfBirth).format('LL')} */}
                        </div>
                    </Col>
                    <Col xs={{ span: 24 }} lg={{ span: 18 }}>
                        <div style={{ marginTop: "40px" }}>
                            <Card title="Recent-Activity" bordered={false} style={{ margin: "40px" }} extra={<Button onClick={() => router.push("/history/" + id)}>History</Button>}>
                                {/* หัวข้อการวิ่ง */}
                                <Row>
                                    <Col xs={{ span: 6, offset: 2 }} lg={{ span: 6, offset: 2 }}>
                                        <h4 style={{ fontSize: "15px", fontWeight: "bold" }}>
                                            Avg.Pace
                                        </h4>
                                    </Col>
                                    <Col xs={{ span: 6, offset: 2 }} lg={{ span: 6, offset: 2 }}>
                                        <h4 style={{ fontSize: "15px", fontWeight: "bold" }}>
                                            Distance
                                        </h4>
                                    </Col>
                                    <Col xs={{ span: 6, offset: 2 }} lg={{ span: 6, offset: 2 }}>
                                        <h4 style={{ fontSize: "15px", fontWeight: "bold" }}>
                                            Time
                                        </h4>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col xs={{ span: 6, offset: 2 }} lg={{ span: 6, offset: 2 }}>
                                        <h5 style={{ fontSize: "15px" }}>
                                            {data2?.currentRun?.pace}
                                        </h5>
                                    </Col>
                                    <Col xs={{ span: 6, offset: 2 }} lg={{ span: 6, offset: 2 }}>
                                        <h5 style={{ fontSize: "15px" }}>
                                            {data2?.currentRun?.distance}
                                        </h5>
                                    </Col>
                                    <Col xs={{ span: 6, offset: 2 }} lg={{ span: 6, offset: 2 }}>
                                        <h5 style={{ fontSize: "15px" }}>
                                            {duration.hours() + day + " hr " + duration.minutes() + " min "}
                                        </h5>
                                    </Col>
                                </Row>
                            </Card>
                        </div>
                        <div style={{ marginTop: "40px" }}>
                            <Card title="All-Time" bordered={false} style={{ margin: "40px" }}>
                                {/* หัวข้อการวิ่ง */}
                                <Row>
                                    <Col xs={{ span: 6, offset: 2 }} lg={{ span: 6, offset: 2 }}>
                                        <h4 style={{ fontSize: "15px", fontWeight: "bold" }}>
                                            Activity
                                        </h4>
                                    </Col>
                                    <Col xs={{ span: 6, offset: 2 }} lg={{ span: 6, offset: 2 }}>
                                        <h4 style={{ fontSize: "15px", fontWeight: "bold" }}>
                                            Distance
                                        </h4>
                                    </Col>
                                    <Col xs={{ span: 6, offset: 2 }} lg={{ span: 6, offset: 2 }}>
                                        <h4 style={{ fontSize: "15px", fontWeight: "bold" }}>
                                            Time
                                        </h4>
                                    </Col>
                                </Row>
                                {/* ข้อมูลการวิ่ง */}
                                <Row>
                                    <Col xs={{ span: 6, offset: 2 }} lg={{ span: 6, offset: 2 }}>
                                        <h5 style={{ fontSize: "15px" }}>
                                            {Activity}
                                        </h5>
                                    </Col>
                                    <Col xs={{ span: 6, offset: 2 }} lg={{ span: 6, offset: 2 }}>
                                        <h5 style={{ fontSize: "15px" }}>
                                            ระยะวิ่งทั้งหมด
                                        </h5>
                                    </Col>
                                    <Col xs={{ span: 6, offset: 2 }} lg={{ span: 6, offset: 2 }}>
                                        <h5 style={{ fontSize: "15px" }}>
                                            เวลาที่ใช้วิ่งทั้งหมด
                                        </h5>
                                    </Col>
                                </Row>
                            </Card>
                        </div>
                        <div style={{ marginTop: "40px" }}>
                            <Card title="Live Running" bordered={false} style={{ margin: "40px" }} extra={<a href="#">History</a>}>
                                {/* หัวข้อการวิ่ง */}
                                <Row>
                                    <Col xs={{ span: 4, offset: 2 }} lg={{ span: 4, offset: 2 }}>
                                        <h4 style={{ fontSize: "15px", fontWeight: "bold" }}>
                                            Park
                                        </h4>
                                    </Col>
                                    <Col xs={{ span: 4, offset: 2 }} lg={{ span: 4, offset: 2 }}>
                                        <h4 style={{ fontSize: "15px", fontWeight: "bold" }}>
                                            Distance
                                        </h4>
                                    </Col>
                                    <Col xs={{ span: 4, offset: 2 }} lg={{ span: 4, offset: 2 }}>
                                        <h4 style={{ fontSize: "15px", fontWeight: "bold" }}>
                                            Time
                                        </h4>
                                    </Col>
                                    <Col xs={{ span: 4, offset: 2 }} lg={{ span: 4, offset: 2 }}>
                                        <h4 style={{ fontSize: "15px", fontWeight: "bold" }}>
                                            Round
                                        </h4>
                                    </Col>
                                </Row>
                                {/* ข้อมูลการวิ่ง */}
                                <Row>
                                    <Col xs={{ span: 4, offset: 2 }} lg={{ span: 4, offset: 2 }}>
                                        <h5 style={{ fontSize: "15px" }}>
                                            สนาม
                                        </h5>
                                    </Col>
                                    <Col xs={{ span: 4, offset: 2 }} lg={{ span: 4, offset: 2 }}>
                                        <h5 style={{ fontSize: "15px" }}>
                                            10 k.m
                                        </h5>
                                    </Col>
                                    <Col xs={{ span: 4, offset: 2 }} lg={{ span: 4, offset: 2 }}>
                                        <h5 style={{ fontSize: "15px" }}>
                                            00:00 m
                                        </h5>
                                    </Col>
                                    <Col xs={{ span: 4, offset: 2 }} lg={{ span: 4, offset: 2 }}>
                                        <h5 style={{ fontSize: "15px" }}>
                                            2
                                        </h5>
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