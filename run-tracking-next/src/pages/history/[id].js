import { Layout } from "antd"
import { useRouter } from "next/router"
import { gql, useMutation, useQuery } from "@apollo/client";

export default function History() {

    const router = new useRouter
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

    return(
        <>
            <Header style={headerStyle}>
                <h1>History</h1>
            </Header>
            <Content>

            </Content>
            <Footer>

            </Footer>
        </>
    )
}