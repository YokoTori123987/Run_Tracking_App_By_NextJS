import { Layout, Card, Col, Row } from "antd"
import { useRouter } from "next/router"
import { gql, useQuery } from "@apollo/client";

export default function History() {

    const router = new useRouter()
    const { id } = router.query
    const { Header, Footer, Content } = Layout;


    const QUERY = gql`
        query FindUserId($id: String!) {
            user(id: $id) {
                id
                Run {
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
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
        // lineHeight: '120px',

    };
    const footerStyle = {
        textAlign: 'center',
        color: '#fff',
        backgroundColor: '#7dbcea',
    };

    const { data, loading } = useQuery(QUERY, {
        variables: { id: id }
    })

    if (loading) {
        return <p>loading</p>
    }

    return (
        <>
            <Header style={headerStyle}>
                <h1>History</h1>
            </Header>
            <Content style={contentStyle}>
                {data.user.Run.map((run) => {
                    return (
                        <Card
                            title={run.park.name}
                            bordered={false}
                            style={{
                                width: "70%",
                                marginTop: "40px"
                            }}
                        >
                            <Row style={{ textAlign: "center"}}>
                                <Col xs={8} sm={8} md={8} lg={8} xl={8}>
                                    <h4>Pace</h4>
                                </Col>
                                <Col xs={8} sm={8} md={8} lg={8} xl={8}>
                                    <h4>Distance</h4>
                                </Col>
                                <Col xs={8} sm={8} md={8} lg={8} xl={8}>
                                    <h4>Time</h4>
                                </Col>
                            </Row>
                            <Row style={{ textAlign: "center"}}> 
                                <Col xs={8} sm={8} md={8} lg={8} xl={8}>
                                    <h4>{run?.pace}</h4>
                                </Col>
                                <Col xs={8} sm={8} md={8} lg={8} xl={8}>
                                    <h4>{run?.distance}</h4>
                                </Col>
                                <Col xs={8} sm={8} md={8} lg={8} xl={8}>
                                    <h4>{run.startTime} {run.stopTime}</h4>
                                </Col>
                            </Row>
                        </Card>
                    )
                })}
            </Content>
            <Footer>

            </Footer>
        </>
    )
}