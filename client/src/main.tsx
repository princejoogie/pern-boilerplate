import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import {
  ApolloClient,
  ApolloLink,
  fromPromise,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { onError } from "@apollo/client/link/error";
import { storeName } from "./constants";
import { appStore, AppStoreType } from "./store/AppStore";
import axios from "axios";

const getNewToken = async () => {
  try {
    const { data } = await axios.post(
      "http://localhost:4000/refresh-token",
      null,
      { withCredentials: true }
    );
    return data.accessToken;
  } catch (err) {
    console.log({ ...err });
    return "";
  }
};

const errorLink = onError(
  ({ graphQLErrors, networkError, forward, operation }) => {
    if (graphQLErrors) {
      for (let err of graphQLErrors) {
        switch (err.extensions?.code) {
          case "UNAUTHENTICATED":
            return fromPromise(
              getNewToken().catch(() => {
                return;
              })
            )
              .filter((value) => Boolean(value))
              .flatMap((accessToken) => {
                appStore.setAccessToken(accessToken);
                return forward(operation);
              });
        }
      }
    }
    if (networkError) {
      console.log(`[Network error]: ${networkError}`);
      return forward(operation);
    }
  }
);

const httpLink = createHttpLink({
  uri: "http://localhost:4000/graphql",
});

const authLink = setContext((_, { headers }) => {
  const store = localStorage.getItem(storeName);
  let token: string | null = null;

  if (store) {
    const parsed = JSON.parse(store) as AppStoreType;
    token = parsed.accessToken;
  }

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: ApolloLink.from([errorLink, authLink, httpLink]),
  // link: authLink.concat(httpLink),
  credentials: "include",
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById("root")
);
