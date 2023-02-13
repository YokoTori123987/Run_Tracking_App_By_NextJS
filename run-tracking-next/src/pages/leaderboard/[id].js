import { gql, useQuery } from "@apollo/client";
import { useRouter } from "next/router"
import { Layout, Table } from "antd";

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
        variables: { parkId: id }
    })

    const { Content, Footer } = Layout;

    console.log(data)

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
            title: 'Name',
            dataIndex: 'name',
            filters: [
                {
                    text: 'Joe',
                    value: 'Joe',
                },
                {
                    text: 'Category 1',
                    value: 'Category 1',
                    children: [
                        {
                            text: 'Yellow',
                            value: 'Yellow',
                        },
                        {
                            text: 'Pink',
                            value: 'Pink',
                        },
                    ],
                },
                {
                    text: 'Category 2',
                    value: 'Category 2',
                    children: [
                        {
                            text: 'Green',
                            value: 'Green',
                        },
                        {
                            text: 'Black',
                            value: 'Black',
                        },
                    ],
                },
            ],
            filterMode: 'tree',
            filterSearch: true,
            onFilter: (value, record) => record.name.includes(value),
            width: '30%',
        },
        {
            title: 'Age',
            dataIndex: 'age',
            sorter: (a, b) => a.age - b.age,
        },
        {
            title: 'Address',
            dataIndex: 'address',
            filters: [
                {
                    text: 'London',
                    value: 'London',
                },
                {
                    text: 'New York',
                    value: 'New York',
                },
            ],
            onFilter: (value, record) => record.address.startsWith(value),
            filterSearch: true,
            width: '40%',
        },
    ];
    const data1 = [
        {
            key: '1',
            name: 'John Brown',
            age: 32,
            address: 'New York No. 1 Lake Park',
        },
        {
            key: '2',
            name: 'Jim Green',
            age: 42,
            address: 'London No. 1 Lake Park',
        },
        {
            key: '3',
            name: 'Joe Black',
            age: 32,
            address: 'Sydney No. 1 Lake Park',
        },
        {
            key: '4',
            name: 'Jim Red',
            age: 32,
            address: 'London No. 2 Lake Park',
        },
    ];

    const onChange = (pagination, filters, sorter, extra) => {
        console.log('params', pagination, filters, sorter, extra);
    };

    return (
        <>
            <Content style={contentStyle}>
                <div className="cotentListLeader">
                    <h2 className="nameLeaderPark" style={{ textAlign: "start" }}>{data?.park?.name}</h2>
                    <h3>LeaderBoard</h3>
                    <Table columns={columns} dataSource={data1} onChange={onChange} className="tableLeadboard" />
                </div>
            </Content>
            <Footer>
            </Footer>
        </>
    )
}