import { gql, useQuery } from "@apollo/client";
import { useRouter } from "next/router"
import { Layout } from "antd";

export default function Leaderboard() {

    const router = new useRouter()
    const { id } = router.query

    const QUERY = gql`
        query Park($parkId: String!) {
            park(id: $parkId) {
                id
                name
                Run {
                id
                pace
                distance
                user {
                    firstName
                    bib
                }
                }
            }
        }
    `

    const { data, loading, error } = useQuery(QUERY, {
        variables: { id: id }
    })

    const { Content, Footer } = Layout;

    console.log(data)

    return (
        <>
            <Content>
                <h2>LeaderBoard</h2>
            </Content>
            <Footer>

            </Footer>
        </>
    )
}