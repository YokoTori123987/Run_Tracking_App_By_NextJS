import { gql, useQuery } from "@apollo/client";
import { useRouter } from "next/router"
import { Layout, Table } from "antd";
import moment from "moment";

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
                    startTime
                    stopTime
                    user {
                        firstName
                        lastName
                        imageUrl
                    }
                }
            }
        }
    `

    const { data, loading, error } = useQuery(QUERY, {
        variables: { parkId: id }
    })

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

    const columns = [
        {   
            title: 'No.',
            dataIndex: 'user',
            width: '1%',
            render: ({}, record, index) => <span>{index+1}</span>
        },
        {
            title: 'Name',
            dataIndex: 'user',
            width: '30%',
            render: ({ firstName, lastName }) => <span>{firstName} {lastName}</span>,
        },
        {
            title: 'Time',
            dataIndex: '',
            width: '40%',
            render: ({ startTime, stopTime }) => {
                const startTime1 = moment(startTime).format("YYYY-MM-DD HH:mm:ss");
                const stopTime1 = moment(stopTime).format("YYYY-MM-DD HH:mm:ss");

                const duration = moment.duration(moment(stopTime1).diff(moment(startTime1)));
                const day = duration.days() * 24;
                
                return (
                    <span>{duration.hours() + day + " hr " + duration.minutes() + " min "}</span>
                )
            },
        },
    ];

    console.log(data?.park?.Run, 'ss');

    return (
        <>
            <Content style={contentStyle}>
                <div className="cotentListLeader">
                    <h2 className="nameLeaderPark" style={{ textAlign: "start" }}>{data?.park?.name}</h2>
                    <h3 style={{ textAlign: "start"}}>LeaderBoard</h3>
                    <Table columns={columns} dataSource={data?.park?.Run} className="tableLeadboard" />
                </div>
            </Content>
            <Footer>
            </Footer>
        </>
    )
}