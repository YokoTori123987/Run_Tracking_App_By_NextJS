import { gql, useQuery } from "@apollo/client";
import { useRouter } from "next/router"
import { Button, Layout, Avatar, List } from "antd";
import moment from "moment";

export default function Park() {

    const router = new useRouter()
    const { id } = router.query

    const QUERY = gql`
        query Park($parkId: String!) {
            park(id: $parkId) {
                id
                name
                imageUrl
                address
                description
                workingHours
                Run {
                    id
                    pace
                    distance
                    startTime
                    stopTime
                    user {
                        firstName
                        lastName
                        bib
                        imageUrl
                    }
                }
            }
        }
    `

    const { data, loading, error } = useQuery(QUERY, {
        variables: { parkId: id }
    })

    if (loading) return <p>Loading ...</p>;
    if (error) return `Error! ${error}`;

    

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
                <div>
                    <div className="contentParks">
                        <img src={data.park.imageUrl} alt="img" className="image-park" />
                    </div>
                    <div className="cotentPark">
                        <div className="headName">
                            <h2 style={{ textAlign: "start" }}>{data?.park.name}</h2>
                        </div>
                        <div className="working">
                            <p>{data.park.workingHours}เวลา เปิด</p>
                        </div>
                        <div className="address">
                            <p>{data.park.address}</p>
                        </div>
                        <div className="description">
                            <p>{data.park.description}</p>
                        </div>
                        <div className="leaderBoardHead">
                            <h2 style={{ textAlign: "start" }}>LeaderBoard</h2>
                            <Button type="primary" onClick={() => router.push("/leaderboard/" + data.park.id)} style={{ paddingLeft: "30px", paddingRight: "30px" }}>More</Button>
                        </div>
                        <List
                            itemLayout="horizontal"
                            style={{ marginBottom: "30px" }}
                            dataSource={data?.park?.Run}
                            renderItem={(run, index) => {
                                const startTime = moment(run?.startTime).format("YYYY-MM-DD HH:mm:ss");
                                const stopTime = moment(run?.stopTime).format("YYYY-MM-DD HH:mm:ss");
                                const duration = moment.duration(moment(stopTime).diff(moment(startTime)));
                                const day = duration.days() * 24;
                                return (
                                    <List.Item>
                                        <div style={{ textAlign: "start", fontSize: "15px", paddingRight: "5px" }}>{index + 1}</div>
                                        <List.Item.Meta
                                            avatar={<Avatar src={run.user.imageUrl} />}
                                            title=<p style={{ textAlign: "start", fontSize: "15px" }}>{run.user.firstName} {run.user.lastName}</p>
                                        />
                                        <div style={{ textAlign: "start", fontSize: "15px" }}>Time: {duration.hours() + day + " hr " + duration.minutes() + " min "}</div>
                                    </List.Item>
                                )
                            }}
                        />
                    </div>
                </div>
            </Content>
            <Footer style={footerStyle}>
                <p>© 2018 Gandalf</p>
            </Footer>
        </>
    )
}