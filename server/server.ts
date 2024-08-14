const { ApolloServer } = require('apollo-server-express');
const express = require('express');
const path = require('path');

const app = express();
if(process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}
const db = require('./config/connection');

const PORT: string | number = process.env.PORT || 3001;
const { typeDefs, resolvers } = require('./schemas');
const { authMiddleware } = require('./utils/auth');

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: authMiddleware
})

const startServer = async () => {
    await server.start();

    server.applyMiddleware({ app })
};
startServer();

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/build')));
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, '../client/build/index.html'));
    });
};


db.once('open', () => {
    app.listen(PORT, () => {
        console.log(`listening at localhost:${PORT}`);
        console.log(`Use graphql at localhost:${PORT}${server.graphqlPath}`)
    })
});