import { Layout, Card } from "antd"
import { gql, useQuery } from "@apollo/client";
import { useRouter } from "next/router"

export default function Parks() {

    const { Header, Footer, Content } = Layout;
    const { Meta } = Card;
    const router = new useRouter()

    const QUERY = gql`
        query Parks {
            parks {
                id
                name
                imageUrl
                address
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
        marginLeft: "40px",
        display: "center",
    };
    const footerStyle = {
        textAlign: 'center',
        color: '#fff',
        backgroundColor: '#7dbcea',
    };

    const { data, loading, error } = useQuery(QUERY)

    if (loading) return <p>Loading ...</p>;
    if (error) return `Error! ${error}`;
    // console.log(data.parks)

    return (
        <>
            <Header style={headerStyle}>
                <h1>Parks</h1>
            </Header>
            <Content style={contentStyle}>
                {data.parks.map((park) => {
                    return (
                        <a onClick={() => router.push("/park/" + park.id)} class="contentParks">
                            <div class="cardParks">
                                <Card
                                    key={park.id}
                                    hoverable
                                    // style={{
                                    //     width: "100%",
                                    //     color: "black",
                                    //     marginTop: "25px",
                                    // }}
                                    cover={<img alt="example" src={park.imageUrl} />}
                                >
                                    <Meta title={park.name} description={park.address} />
                                </Card>
                            </div>
                        </a>
                    )
                })}

            </Content>

            <Footer></Footer>
        </>
    )
}