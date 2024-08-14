import { gql } from '@apollo/client';

export const ADD_APP = gql`
    mutation addApp($jobTitle: String!, $companyName: String!, $jobDescription: String!, $status: String!, $location: String!, $quickApply: Boolean!, $jobScore: Int, $link: String) {
        addApp(jobTitle: $jobTitle, companyName: $companyName, jobDescription: $jobDescription, status: $status, location: $location, quickApply: $quickApply, jobScore: $jobScore, link: $link) {
            _id
            jobTitle
            jobDescription
            status
            location
            quickApply
            jobScore
            dateApplied
            lastUpdated
            link
            notes {
                _id
                noteText
                dateAdded
            }
            questions {
                _id
            }
        }
    }
`;

export const EDIT_APP = gql`
    mutation editApp($id: ID!, $jobTitle: String!, $jobDescription: String!, $companyName: String!, $status: String, $location: String!, $quickApply: Boolean!, $jobScore: Int, $link: String) {
        editApp(_id: $id, jobTitle: $jobTitle, jobDescription: $jobDescription, status: $status, location: $location, quickApply: $quickApply, companyName:$companyName, jobScore: $jobScore, link: $link ) {
            _id
            jobTitle
            jobDescription
            status
            statusHistory {
                dateChanged
                status
            }
            location
            quickApply
            jobScore
            dateApplied
            companyName
            lastUpdated
            link
            notes {
                _id
                noteText
                dateAdded
            }
            questions {
                _id
            }
        }
    }
`;

export const EDIT_APP_STATUS = gql`
    mutation Mutation($id: ID!, $status: String!) {
        editAppStatus(_id: $id, status: $status) {
            _id
            jobTitle
            status
            statusHistory {
                dateChanged
                status
            }
            location
            dateApplied
            companyName
            lastUpdated
        }
    }
`;

export const DELETE_APP = gql`
    mutation Mutation($id: ID!) {
        deleteApp(_id: $id) {
            _id
            jobTitle
            jobDescription
            location
            status
            quickApply
            jobScore
            dateApplied
            link
            notes {
                _id
                noteText
                dateAdded
            }
            questions {
                _id
            }
        }
    }
`;

export const ADD_NOTE = gql`
    mutation Mutation($noteText: String!, $appId: ID!) {
        addNote(noteText: $noteText, appId: $appId) {
            _id
            jobTitle
            jobDescription
            location
            status
            quickApply
            jobScore
            dateApplied
            notes {
                _id
                noteText
                dateAdded
            }
            questions {
                _id
            }
        }
    }
`;

export const DELETE_NOTE = gql`
    mutation ($noteId: ID!, $appId: ID!) {
        deleteNote(noteId: $noteId, appId: $appId) {
            _id
            jobTitle
            jobDescription
            location
            status
            quickApply
            jobScore
            dateApplied
            notes {
                _id
                noteText
            }
            questions {
                _id
            }
        }
    }
`;

export const ADD_QUESTION = gql`
    mutation Mutation($appId: ID!, $questionText: String!, $roleTag: String) {
        addQuestion(appId: $appId, questionText: $questionText, roleTag: $roleTag) {
        _id
        dateAdded
        lastUpdated
        questionText
        roleTag
        }
    }
`;

export const EDIT_QUESTION = gql`
    mutation EditQuestion($questionId: ID!, $questionText: String, $roleTag: String) {
        editQuestion(questionId: $questionId, questionText: $questionText, roleTag: $roleTag) {
        _id
        dateAdded
        lastUpdated
        questionText
        roleTag
        }
    }
`;

export const DELETE_QUESTION = gql`
    mutation Mutation($questionID: ID!, $appId: ID!) {
        deleteQuestion(questionId: $questionID, appId: $appId) {
            _id
            jobTitle
            jobDescription
            location
            status
            quickApply
            jobScore
            dateApplied
            notes {
                _id
                noteText
            }
            questions {
                _id
            }
        }
    }  
`;

export const LOGIN = gql`
    mutation ($username: String!, $password: String!) {
        login(username: $username, password: $password) {
            token
            user {
                _id
                username
            }
        }
    }
`;

export const SIGNUP = gql`
    mutation ($username: String!, $password: String!, $email: String!) {
        addUser(username: $username, password: $password, email: $email) {
            token
            user {
                _id
                username
            }
        }
    }
`;