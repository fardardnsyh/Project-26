import { Routes, Route } from "react-router-dom";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink
} from "@apollo/client";
import { setContext } from '@apollo/client/link/context';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import "./App.css";

// components
import Header from "./components/Header";
import SingleApp from "./pages/SingleApp";
import TrackerFormPage from "./pages/TrackerForm";
import TrackerTable from "./pages/TrackerTable";
import LoginPage from "./pages/Login";
import CreditsPage from './pages/Credits'
import LandingPage from "./pages/Landing";

import Auth from './utils/auth';

const cache = new InMemoryCache();
const httpLink = createHttpLink({
  uri: "/graphql"
})
const token = localStorage.getItem('token');
const authLink = setContext((request, { headers }) => ({
  headers: {
    authorization: token
  }
}))

const client = new ApolloClient({
  cache: cache,
  link: authLink.concat(httpLink)
});

function App() {
  if(window.location.pathname==='/') {
    if(Auth.loggedIn()) {
      window.location.assign('/applied');
    }
  }
  return (
    <ApolloProvider client={client}>
      <>
        <Header />
        <ToastContainer />
        <main className="relative flex">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="login" element={<LoginPage />} />
            <Route path="tracker" element={<TrackerFormPage />} />
            <Route path="applied" element={<TrackerTable />} />
            <Route path="applied/:jobId" element={<SingleApp />} /> 
            <Route path="credits" element={<CreditsPage />} /> 
          </Routes>
        </main>
      </>
    </ApolloProvider>
  );
}

export default App;
