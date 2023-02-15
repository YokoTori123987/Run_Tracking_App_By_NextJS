import { Layout, Card, Col, Row, List } from "antd"
import { useRouter } from "next/router"
import { gql, useQuery } from "@apollo/client";
import { useUserAuth } from "../context/UserAuthContext";
import style from "@/styles/history.module.css"
import moment from "moment"

import 'moment/locale/th'
moment.locale('th')

export default function History() {

    const router = new useRouter()
    const { Header, Footer, Content } = Layout;
    const { user } = useUserAuth();

    const QUERY = gql`
        query FindUserId($id: String!) {
            user(id: $id) {
                id
                runsHistory {
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
        marginRight: "40px",
        marginLeft: "40px"
    };
    const footerStyle = {
        textAlign: 'center',
        color: '#fff',
        backgroundColor: '#7dbcea',
    };

    const { data, loading } = useQuery(QUERY, {
        variables: { id: user?.id }
    })

    if (loading) {
        return <p>loading</p>
    }

    let length = data?.user?.runsHistory.length;

    let sum = 0;

    return (
        <>
            <Header style={headerStyle}>
                <h1 className={style.topicOne}>History</h1>
            </Header>
            <Content style={contentStyle}>
                <List
                    itemLayout="vertical"
                    size="large"
                    pagination={{
                        onChange: (page) => {
                            console.log(page);
                        },
                        pageSize: 4,
                    }}
                    dataSource={data?.user?.runsHistory}
                    footer={
                        <div style={{ marginTop: "20px", textAlign: "end" }}>
                            <b>Total</b> {length}
                        </div>
                    }
                    renderItem={((run) => {
                        const startTime = moment(run?.startTime).format("YYYY-MM-DD HH:mm:ss");
                        const stopTime = moment(run?.stopTime).format("YYYY-MM-DD HH:mm:ss");
                        const duration = moment.duration(moment(stopTime).diff(moment(startTime)))
                        const day = duration.days() * 24  
                        return (
                            <Card
                                title={run?.park?.name}
                                bordered={false}
                                style={{
                                    width: "100%",
                                    marginTop: "40px",
                                }}
                                extra={<p style={{ fontSize: "15px" }}>{moment(run?.startTime).format('DD MMMM YYYY')}</p>}
                            >
                                <Row style={{ textAlign: "center" }}>
                                    <Col xs={8} sm={8} md={8} lg={8} xl={8}>
                                        <h4 style={{ fontSize: "15px", fontWeight: "bold" }} className={style.topicFour}>
                                            Pace
                                        </h4>
                                    </Col>
                                    <Col xs={8} sm={8} md={8} lg={8} xl={8}>
                                        <h4 style={{ fontSize: "15px", fontWeight: "bold" }} className={style.topicFour}>
                                            Distance
                                        </h4>
                                    </Col>
                                    <Col xs={8} sm={8} md={8} lg={8} xl={8}>
                                        <h4 style={{ fontSize: "15px", fontWeight: "bold" }} className={style.topicFour}>
                                            Time
                                        </h4>
                                    </Col>
                                </Row>
                                <Row style={{ textAlign: "center" }}>
                                    <Col xs={8} sm={8} md={8} lg={8} xl={8}>
                                        <h4 className={style.topicFour}>
                                            {run?.pace}
                                        </h4>
                                    </Col>
                                    <Col xs={8} sm={8} md={8} lg={8} xl={8}>
                                        <h4 className={style.topicFour}>
                                            {run?.distance}
                                        </h4>
                                    </Col>
                                    <Col xs={8} sm={8} md={8} lg={8} xl={8}>
                                        <h4 className={style.topicFour}>
                                            {duration.hours() + day + " h " + duration.minutes() + " m "}
                                        </h4>
                                    </Col>
                                </Row>
                            </Card>
                        )
                    })}
                />
            </Content>
        </>
    )
}