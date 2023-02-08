import { gql, useQuery } from "@apollo/client";
import { useRouter } from "next/router"
import { Button, Layout, Avatar, List } from "antd";

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
            }
        }
    `

    const { data, loading, error } = useQuery(QUERY, {
        variables: { parkId: id }
    })

    if (loading) return <p>Loading ...</p>;
    if (error) return `Error! ${error}`;

    const { Header, Content, Footer } = Layout;

    const data1 = [
        {
            title: 'Ant Design Title 1',
        },
        {
            title: 'Ant Design Title 2',
        },
        {
            title: 'Ant Design Title 3',
        },
        {
            title: 'Ant Design Title 4',
        },
    ];


    const contentStyle = {
        minHeight: 750,
        width: "100%",
    };
    const footerStyle = {
        textAlign: 'center',
        color: '#fff',
        backgroundColor: '#7f7f7f',
    };

    // console.log(data)

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
                            dataSource={data1}
                            renderItem={(item) => (
                                <List.Item>
                                    <List.Item.Meta
                                        avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
                                        title={<a href="https://ant.design"><p style={{ textAlign: "start" }}>{item.title}</p></a>}
                                        description="Ant Design, a design language for background applications, is refined by Ant UED Team"
                                    />
                                </List.Item>
                            )}
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