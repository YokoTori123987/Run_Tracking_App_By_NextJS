import { Inter } from "@next/font/google";
import { useUserAuth } from "../context/UserAuthContext";
import { useQuery, gql } from "@apollo/client";
import { useRouter } from "next/router";
import { Button } from "antd";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {

  const router = new useRouter()
  const { user, logOut } = useUserAuth();

  // console.log(user.uid)
  const id = user.uid

  const QUERY = gql`
    query AuthUser($phoneNumberuuid: String!) {
      authUser(phoneNumberuuid: $phoneNumberuuid) {
        id
        firstName
        lastName
      }
    }
  `

  const { data, loading, error } = useQuery(QUERY, {
    variables: { phoneNumberuuid: id }
  })

  if (loading) return <p>Loading ...</p>;
  if (error) return `Error! ${error}`;

  console.log(data.authUser.firstName)

  return <>
    <Button onClick={() => router.push("/statistic/" + data.authUser.id)}>Statistic</Button>
    <Button onClick={() => router.push("/history/" + data.authUser.id)}>History</Button>
  </>;
}
