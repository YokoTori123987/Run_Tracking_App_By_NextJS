const {gql} = require('apollo-server-micro')

export const schema = gql`
    type User{
        id: String
        email: String
        emailuuid: String
    }
    type Query {
        users: [User]!
    }

`