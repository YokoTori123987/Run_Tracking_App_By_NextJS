import { gql, useQuery } from "@apollo/client";
import { useRouter } from "next/router"
import { Button, Layout } from "antd";

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
                    <div class="contentParks">
                        <img src={data.park.imageUrl} alt="img" class="image-park" />
                    </div>
                    <div class="cotentPark">
                        <div class="headName">
                            <h2 style={{ textAlign: "start" }}>{data?.park.name}</h2>
                        </div>
                        <div class="working">
                            <p>{data.park.workingHours}เวลา เปิด</p>
                        </div>
                        <div class="address">
                            <p>{data.park.address}</p>
                        </div>
                        <div class="description">
                            <p>{data.park.description}</p>
                        </div>
                        <div class="leaderboard">
                            <h2 style={{ textAlign: "start" }}>LeaderBoard</h2>
                            <Button class="button-ldb">onClick</Button>
                        </div>
                    </div>
                </div>
            </Content>
            <Footer style={footerStyle}>
                <p>© 2018 Gandalf</p>
            </Footer>
        </>
    )
}