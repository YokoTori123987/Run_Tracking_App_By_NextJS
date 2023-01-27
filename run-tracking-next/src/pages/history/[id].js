import { Layout } from "antd"
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
    
    if(loading) {
        return <p>loading</p>
    }

    console.log(data.user.Run)

    return(
        <>
            <Header style={headerStyle}>
                <h1>History</h1>
            </Header>
            <Content>
                <div>
                {data.user.Run.map((el) => {
                    <div key={el.id}>
                        <p>{el.pace}</p>
                        <p>{el.distance}</p>
                    </div>
                })}
                </div> 
            </Content>
            <Footer>

            </Footer>
        </>
    )
}