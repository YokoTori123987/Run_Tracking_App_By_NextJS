import { gql, useQuery } from "@apollo/client";
import { useRouter } from "next/router"

export default function Park() {

    const router = new useRouter()
    const { id } = router.query

    const QUERY = gql`
        query Park($parkId: String!) {
            park(id: $parkId) {
                id
                name
            }
        }
    `
 
    const { data, loading, error } = useQuery(QUERY, {
        variables: { parkId : id }
    })

    if (loading) return <p>Loading ...</p>;
    if (error) return `Error! ${error}`;
    
    console.log(data)

    return (
        <>
            sdasdsa
        </>
    )
}