import { useRouter } from "next/router"
import { useQuery, gql } from "@apollo/client"
import { Col, Row, Layout, Card, Button, Image } from "antd"
import { useUserAuth } from "../context/UserAuthContext";
import moment, { duration } from "moment"
import style from "@/styles/statistic.module.css"

import 'moment/locale/th'
moment.locale('th')

export default function Statistic() {

    const router = new useRouter();
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
                runsHistory {
                    id
                    startTime
                    stopTime
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

    const QUERY3 = gql`
        query Query($userId: String!) {
            userDistance(userId: $userId)
        }
    `



    const { data, loading, error } = useQuery(QUERY, {
        variables: { id: user?.id }
    })

    const { data: data2, loading: loading2, error: error2 } = useQuery(QUERY2, {
        variables: { userId: user?.id }
    })

    const { data: data3, loading: loading3, error: error3 } = useQuery(QUERY3, {
        variables: { userId: user?.id }
    })

    if (loading) return <p>Loading ...</p>;
    if (error) return `Error! ${error}`;

    let Activity = data?.user?.runsHistory.length;

    const historyByID = user.id;

    let sum = 0;
    let hours, minutes, seconds

    const startTime = moment(data2?.currentRun?.startTime).format("YYYY-MM-DD HH:mm:ss");
    const stopTime = moment(data2?.currentRun?.stopTime).format("YYYY-MM-DD HH:mm:ss");

    const duration = moment.duration(moment(stopTime).diff(moment(startTime)));

    const day = duration.days() * 24;

    data?.user?.runsHistory.map((run) => {
        const startTime1 = moment(run?.startTime).format("YYYY-MM-DD HH:mm:ss");
        const stopTime1 = moment(run?.stopTime).format("YYYY-MM-DD HH:mm:ss");

        const duration1 = moment.duration(moment(stopTime1).diff(moment(startTime1)));

        sum += duration1._milliseconds
        // console.log(sum, 's')

        seconds = Math.floor(sum / 1000)
        minutes = Math.floor(seconds / 60)
        hours = Math.floor(minutes / 60)

        seconds = seconds % 60
        minutes = minutes % 60
        // console.log(hours, minutes, seconds, 'ss')
        // console.log(hoursDuration)
    })

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
        marginTop: "2%"
    };
    const footerStyle = {
        textAlign: 'center',
        color: '#fff',
        backgroundColor: '#7dbcea',
    };


    return (
        <>
            <Content style={contentStyle}>
                <Row>
                    <Col xs={{ span: 24 }} lg={{ span: 6 }} style={{ display: "flex", flexDirection: "column", marginTop: "30px", alignItems: "center" }}>
                        <h2 style={{ marginBottom: "20px" }} className={style.topicTwo}>Profile</h2>
                        <img src="https://th.bing.com/th/id/R.f81936ad509f82c43bc17a903c8a1bf0?rik=GLun8UNuhTh1dQ&riu=http%3a%2f%2fwww.blognone.com%2fsites%2fdefault%2ffiles%2fnews-thumbnails%2fDoraemon.PNG%3f1346647979&ehk=ddjyAxlHrJLxQMSjSgoj7j7Vz4ZWCvUo6%2fIVo4qsHX0%3d&risl=&pid=ImgRaw&r=0&sres=1&sresct=1" className={style.imgprofile} />
                        <div style={{ paddingTop: "25px" }}>
                            <h4 style={{ paddingTop: "10px", textAlign: "start" }} className={style.topicFour}>BIB : {data?.user?.bib}</h4>
                            <h4 style={{ paddingTop: "10px", textAlign: "start" }} className={style.topicFour}>Name : {data?.user?.firstName} {data?.user?.lastName}</h4>
                            <h4 style={{ paddingTop: "10px", textAlign: "start" }} className={style.topicFour}>Phone : {data?.user?.phoneNumber}</h4>
                            <h4 style={{ paddingTop: "10px", textAlign: "start" }} className={style.topicFour}>Email : {data?.user?.email}</h4>
                            <h4 style={{ paddingTop: "10px", textAlign: "start" }} className={style.topicFour}>Birthday :  {moment(data?.user?.dateOfBirth).format('LL')}</h4>
                            {/* {moment(data?.user?.dateOfBirth).format('LL')} */}
                        </div>
                    </Col>
                    <Col xs={{ span: 24 }} lg={{ span: 18 }}>
                        <div style={{ marginTop: "40px" }}>
                            <Card title="Recent-Activity" bordered={false} style={{ margin: "40px" }} extra={<Button onClick={() => router.push("/history")}>History</Button>}>
                                <div className={style.recentPD}>
                                    <p>{data2?.currentRun?.park?.name}</p>
                                    <p>{moment(data2?.currentRun?.startTime).format('LL')}</p>
                                </div>
                                {/* หัวข้อการวิ่ง */}
                                <Row>
                                    <Col xs={{ span: 6, offset: 2 }} lg={{ span: 6, offset: 2 }}>
                                        <h4 style={{ fontSize: "15px", fontWeight: "bold" }} className={style.topicFour}>
                                            Avg.Pace
                                        </h4>
                                    </Col>
                                    <Col xs={{ span: 6, offset: 2 }} lg={{ span: 6, offset: 2 }}>
                                        <h4 style={{ fontSize: "15px", fontWeight: "bold" }} className={style.topicFour}>
                                            Distance
                                        </h4>
                                    </Col>
                                    <Col xs={{ span: 6, offset: 2 }} lg={{ span: 6, offset: 2 }}>
                                        <h4 style={{ fontSize: "15px", fontWeight: "bold" }} className={style.topicFour}>
                                            Time
                                        </h4>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col xs={{ span: 6, offset: 2 }} lg={{ span: 6, offset: 2 }}>
                                        <h5 style={{ fontSize: "14px" }} className={style.topicFive}>
                                            {data2?.currentRun?.pace}
                                        </h5>
                                    </Col>
                                    <Col xs={{ span: 6, offset: 2 }} lg={{ span: 6, offset: 2 }}>
                                        <h5 style={{ fontSize: "14px" }} className={style.topicFive}>
                                            {data2?.currentRun?.distance}
                                        </h5>
                                    </Col>
                                    <Col xs={{ span: 6, offset: 2 }} lg={{ span: 6, offset: 2 }}>
                                        <h5 style={{ fontSize: "14px" }} className={style.topicFive}>
                                            {duration.hours() + day + " h " + duration.minutes() + " m "}
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
                                        <h4 style={{ fontSize: "15px", fontWeight: "bold" }} className={style.topicFour}>
                                            Activity
                                        </h4>
                                    </Col>
                                    <Col xs={{ span: 6, offset: 2 }} lg={{ span: 6, offset: 2 }}>
                                        <h4 style={{ fontSize: "15px", fontWeight: "bold" }} className={style.topicFour}>
                                            Distance
                                        </h4>
                                    </Col>
                                    <Col xs={{ span: 6, offset: 2 }} lg={{ span: 6, offset: 2 }}>
                                        <h4 style={{ fontSize: "15px", fontWeight: "bold" }} className={style.topicFour}>
                                            Time
                                        </h4>
                                    </Col>
                                </Row>
                                {/* ข้อมูลการวิ่ง */}
                                <Row>
                                    <Col xs={{ span: 6, offset: 2 }} lg={{ span: 6, offset: 2 }}>
                                        <h5 style={{ fontSize: "14px" }} className={style.topicFive}>
                                            {Activity}
                                        </h5>
                                    </Col>
                                    <Col xs={{ span: 6, offset: 2 }} lg={{ span: 6, offset: 2 }}>
                                        <h5 style={{ fontSize: "14px" }} className={style.topicFive}>
                                            {data3?.userDistance}
                                        </h5>
                                    </Col>
                                    <Col xs={{ span: 6, offset: 2 }} lg={{ span: 6, offset: 2 }}>
                                        <h5 style={{ fontSize: "14px" }} className={style.topicFive}>
                                            {hours} h {minutes} m
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
                                        <h4 style={{ fontSize: "15px", fontWeight: "bold" }} className={style.topicFour}>
                                            Park
                                        </h4>
                                    </Col>
                                    <Col xs={{ span: 4, offset: 2 }} lg={{ span: 4, offset: 2 }}>
                                        <h4 style={{ fontSize: "15px", fontWeight: "bold" }} className={style.topicFour}>
                                            Distance
                                        </h4>
                                    </Col>
                                    <Col xs={{ span: 4, offset: 2 }} lg={{ span: 4, offset: 2 }}>
                                        <h4 style={{ fontSize: "15px", fontWeight: "bold" }} className={style.topicFour}>
                                            Time
                                        </h4>
                                    </Col>
                                    <Col xs={{ span: 4, offset: 2 }} lg={{ span: 4, offset: 2 }}>
                                        <h4 style={{ fontSize: "15px", fontWeight: "bold" }} className={style.topicFour}>
                                            Round
                                        </h4>
                                    </Col>
                                </Row>
                                {/* ข้อมูลการวิ่ง */}
                                <Row>
                                    <Col xs={{ span: 4, offset: 2 }} lg={{ span: 4, offset: 2 }}>
                                        <h5 style={{ fontSize: "14px" }} className={style.topicFive}>
                                            สนาม
                                        </h5>
                                    </Col>
                                    <Col xs={{ span: 4, offset: 2 }} lg={{ span: 4, offset: 2 }}>
                                        <h5 style={{ fontSize: "14px" }} className={style.topicFive}>
                                            10 k.m
                                        </h5>
                                    </Col>
                                    <Col xs={{ span: 4, offset: 2 }} lg={{ span: 4, offset: 2 }}>
                                        <h5 style={{ fontSize: "14px" }} className={style.topicFive}>
                                            00:00 m
                                        </h5>
                                    </Col>
                                    <Col xs={{ span: 4, offset: 2 }} lg={{ span: 4, offset: 2 }}>
                                        <h5 style={{ fontSize: "14px" }} className={style.topicFive}>
                                            3
                                        </h5>
                                    </Col>
                                </Row>
                            </Card>
                        </div>
                    </Col>
                </Row>
            </Content>
        </>
    )
}