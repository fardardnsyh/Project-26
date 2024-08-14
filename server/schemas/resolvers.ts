import { AuthenticationError } from 'apollo-server-express';

const { App, User, Question } = require("../models");
import { AppDocument } from '../models';
const { signToken } = require('../utils/auth');

interface IdAppProps {
    _id: String
}

interface AppIdProps extends AppDocument {
    appId: String
}

interface NoteIdProps {
    noteId: String,
    appId: String
}

interface AddQuestionProps {
    questionText: String,
    roleTag: String,
    appId: String
}

interface EditQuestionProps extends AddQuestionProps {
    questionId: String
}

interface AddUserProps {
    username: String,
    password: String,
    email: String
}

const resolvers = {
    Query: {
        apps: async () => {
            const appsData = await App.find().sort({ dateApplied: -1, location: 'asc' }).populate('questions');
            return appsData;
        },
        app: async (_: undefined, { _id }: IdAppProps) => {
            const appData = await App.findById(_id).populate('questions');
            return appData;
        },
        users: async () => {
            const userData = await User.find().select('-__v -password').populate('apps');
            return userData;
        },
        myApps: async (_: undefined, args, { user }) => {
            if (user) {
                const userData = await User.findOne({ _id: user._id }).select('-__v -password').populate('apps');
                return userData.apps;
            }
            throw new AuthenticationError('You are not logged in');
        }
    },
    Mutation: {
        addApp: async (_: undefined, args: AppDocument, context) => {
            if (context.user) {
                const lastUpdated = Date.now();
                // this might be handled on the backend;
                const basicQuestionsList = [
                    'What is the breakdown of the team and who does what?',
                    'What are you most excited about having a new person in this role?',
                    'What is your biggest pain point? How will this role alleviate that?',
                    'What advice would you give someone through the rest of the interviewing process?',
                    'What is the rest of the hiring process?'
                ];
                const statusChange = {
                    dateChanged: lastUpdated,
                    status: args.status
                };
                const questionsList = basicQuestionsList.map(question => {
                    return {
                        questionText: question,
                        roleTag: '',
                        lastUpdated
                    };
                })

                const questionData = await Question.create(questionsList);
                const statusHistory = [statusChange];
                const appData = await App.create({ ...args, lastUpdated, statusHistory, questions: questionData.map(question => question._id) });

                await User.findByIdAndUpdate(
                    context.user._id,
                    { $push: { apps: appData._id } },
                    { new: true }
                );
                return appData;
            }
            throw new AuthenticationError('You are not logged in');
        },
        editApp: async (_: undefined, args: AppDocument, context) => {
            if (context.user) {
                const { _id, status } = args;
                const lastUpdated = Date.now();
                let statusChange = {
                    status: status,
                    dateChanged: lastUpdated
                };
                let appData = !status ?
                    await App.findByIdAndUpdate(_id, { ...args, lastUpdated }, { new: true }) :
                    await App.findByIdAndUpdate(_id, { ...args, $addToSet: { statusHistory: statusChange }, lastUpdated }, { new: true })
                return appData;
            }
            throw new AuthenticationError('You are not logged in');
        },
        editAppStatus: async (_: undefined, args: AppDocument, context) => {
            if (context.user) {
                const { _id, status } = args;
                const lastUpdated = Date.now();
                let statusChange = {
                    status: status,
                    dateChanged: lastUpdated
                };
                const appData = await App.findByIdAndUpdate(_id, { $addToSet: { statusHistory: statusChange }, status, lastUpdated }, { new: true });
                return appData;
            }
            throw new AuthenticationError('You are not logged in');
        },
        deleteApp: async (_: undefined, { _id }: IdAppProps, context) => {
            if (context.user) {
                const deletedAppData = await App.findOneAndDelete({ _id });
                return deletedAppData;
            }
            throw new AuthenticationError('You are not logged in');
        },
        addNote: async (_: undefined, args: AppIdProps, context) => {
            if (context.user) {
                const { appId } = args;
                const lastUpdated = Date.now();
                const updatedAppData = await App.findByIdAndUpdate(
                    { _id: appId },
                    { $addToSet: { notes: args }, lastUpdated },
                    { new: true }
                );
                return updatedAppData
            }
            throw new AuthenticationError('You are not logged in');
        },
        deleteNote: async (_: undefined, args: NoteIdProps, context) => {
            if (context.user) {
                const { appId, noteId } = args;
                const lastUpdated = Date.now();
                const updatedAppData = await App.findByIdAndUpdate(
                    { _id: appId },
                    { $pull: { notes: { _id: noteId } }, lastUpdated },
                    { new: true }
                );
                return updatedAppData;
            }
            throw new AuthenticationError('You are not logged in');
        },
        addQuestion: async (_: undefined, args: AddQuestionProps, context) => {
            if (context.user) {
                const lastUpdated = Date.now();
                const questionData = await Question.create(args);
                await App.findByIdAndUpdate(
                    { _id: args.appId },
                    { $push: { questions: questionData._id }, lastUpdated },
                    { new: true }
                );
                return questionData;
            }
            throw new AuthenticationError('You are not logged in');
        },
        editQuestion: async (_: undefined, args: EditQuestionProps, context) => {
            if (context.user) {
                const { questionText, questionId, roleTag } = args;
                const lastUpdated = Date.now();
                const questionData = await Question.findByIdAndUpdate(
                    { _id: questionId },
                    { questionText, lastUpdated, roleTag },
                    { new: true }
                );
                return questionData;
            }
            throw new AuthenticationError('You are not logged in');
        },
        deleteQuestion: async (_: undefined, args: EditQuestionProps, context) => {
            if (context.user) {
                const { questionId, appId } = args;
                await Question.findOneAndDelete({ _id: questionId });
                const lastUpdated = Date.now();

                const updatedAppData = await App.findByIdAndUpdate(
                    { _id: appId },
                    { $pull: { questions: questionId }, lastUpdated },
                    { new: true }
                )
                return updatedAppData;
            }
            throw new AuthenticationError('You are not logged in');
        },
        addUser: async (_: undefined, args: AddUserProps) => {
            const userData = await User.create(args);
            const token = signToken(userData);
            return { userData, token };
        },
        login: async (_: undefined, args: AddUserProps) => {
            const { username, password } = args;
            const user = await User.findOne({ username });

            if (!user) {
                throw new AuthenticationError('Wrong credentials')
            }
            const isCorrectPassword = await user.isCorrectPassword(password);
            if (!isCorrectPassword) {
                throw new AuthenticationError('Wrong credentials')
            }
            const token = signToken(user);

            return { user, token };
        }
    }
};

export default resolvers;