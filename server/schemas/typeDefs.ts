import { gql } from 'apollo-server-express';

const typeDefs = gql`
    type App {
        _id: ID!
        jobTitle: String!
        jobDescription: String!
        companyName: String!
        status: String
        statusHistory: [StatusChange]
        location: String!
        quickApply: Boolean!
        jobScore: Int
        dateApplied: String
        lastUpdated: String
        notes: [Note]
        questions: [Question]
        link: String
    }

    type Note {
        _id: ID!
        noteText: String!
        dateAdded: String!
    }

    type Question {
        _id: ID!
        questionText: String!
        dateAdded: String!
        lastUpdated: String!
        roleTag: String
    }

    type User {
        _id:ID!
        username: String!
        password: String!
        email: String!
        apps: [App]
    }

    type StatusChange {
        status: String!
        dateChanged: String!
    }

    type Query {
        apps: [App]
        app(_id: ID!): App
        users: [User]
        myApps: [App]
    }

    type Auth {
        token: String
        user: User
    }

    type Mutation {
        addApp(jobTitle: String!, companyName: String!, jobDescription: String!, status: String!, location: String!, quickApply: Boolean!, jobScore: Int, link: String): App
        editApp(_id: ID!, jobTitle: String!, jobDescription: String!, companyName: String!, status: String, location: String!, quickApply: Boolean!, jobScore: Int, lastUpdated: String, link: String) : App
        editAppStatus(_id: ID!, status: String!) : App
        deleteApp(_id: ID!) : App
        addNote(appId: ID!, noteText: String!) : App
        deleteNote(appId: ID!, noteId: ID! ): App
        addQuestion(appId: ID!, questionText: String!, roleTag: String) : Question
        editQuestion(questionId: ID!, questionText: String, roleTag: String) : Question
        deleteQuestion(questionId: ID!, appId: ID!) : App
        addUser(username: String!, password: String!, email: String!): Auth
        login(username: String!, password: String!): Auth
    }
`;

export default typeDefs;