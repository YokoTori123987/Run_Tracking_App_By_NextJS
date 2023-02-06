import { gql, useQuery } from "@apollo/client";
import { useRouter } from "next/router"
import { Layout } from "antd";

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
        display: "flex",
        flexDirection: "column",
        // justifyContent: "center",
        // alignItems: "center",
        width: "100%",
    };
    const footerStyle = {
        textAlign: 'center',
        color: '#fff',
        backgroundColor: '#7f7f7f',
    };

    console.log(data)

    return (
        <>
            <Header style={headerStyle}>
                <h1>{data.park.name}</h1>
            </Header>
            <Content style={contentStyle}>
                <div>
                    <img src={data.park.imageUrl} alt="img" class="image-park" />
                </div>
                <div>
                    {data?.park.name}
                </div>
                <div>
                    {data.park.address}
                </div>
                <div>
                    {data.park.description}
                </div>
                <div>
                    {data.park.workingHours}
                </div>
            </Content>
            <Footer style={footerStyle}>
                <p>© 2018 Gandalf</p>
            </Footer>
        </>
    )
}