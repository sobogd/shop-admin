import React from "react";
import { render } from "react-dom";
import Root from "./root";
import { Router } from "react-router";
import { createBrowserHistory } from "history";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import "./i18n/config";

const graphQlClient = new ApolloClient({
  uri: "/graphql",
  cache: new InMemoryCache(),
});
render(
  <ApolloProvider client={graphQlClient}>
    <Router history={createBrowserHistory()}>
      <Root />
    </Router>
  </ApolloProvider>,
  document.getElementById("root")
);
