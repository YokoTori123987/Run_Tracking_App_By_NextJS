import { gql, useQuery } from "@apollo/client";
import { useRouter } from "next/router"
import { Button, Layout, Avatar, List } from "antd";
import moment from "moment";
import style from "@/styles/park.module.css"

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

export default function Park() {

    const router = new useRouter()
    const { id } = router.query

    const { data, loading, error } = useQuery(QUERY, {
        variables: { parkId: id }
    })

    if (loading) return <p>Loading ...</p>;
    if (error) return `Error! ${error}`;
    
    // data?.park?.Run.sort((a, b) => {
    //     let a 
    //     let b
    //     return a.distance - b.distance
    // })

    // console.log(data?.park?.Run);

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
                    <div className={style.contentParks}>
                        <img src={data.park.imageUrl} alt="img" className={style.imagePark} />
                    </div>
                    <div className={style.cotentPark}>
                        <div className={style.headName}>
                            <h2 style={{ textAlign: "start" }} className={style.topicTwo}>{data?.park.name}</h2>
                        </div>
                        <div className={style.working}>
                            <p>{data.park.workingHours}เวลา เปิด</p>
                        </div>
                        <div className={style.address}>
                            <p>{data.park.address}</p>
                        </div>
                        <div className={style.description}>
                            <p>{data.park.description}</p>
                        </div>
                        <div className={style.leaderBoardHead}>
                            <h2 style={{ textAlign: "start" }} className={style.topicTwo}>LeaderBoard</h2>
                            <div className={style.buttonLeader}>
                            <Button type="primary" onClick={() => router.push("/leaderboard/" + data.park.id)} style={{ paddingLeft: "30px", paddingRight: "30px"}}>More</Button>
                            </div>
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
                                            title=<h4 style={{ textAlign: "start", fontSize: "15px" }} className={style.topicFour}>{run.user.firstName} {run.user.lastName}</h4>
                                        />
                                        <h4 style={{ textAlign: "start", fontSize: "15px" }} className={style.topicFour}>Time: {duration.hours() + day + " hr " + duration.minutes() + " min "}</h4>
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