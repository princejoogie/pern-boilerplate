import React from "react";
import { RouteProps, useHistory } from "react-router-dom";
import { PathURL } from "../constants";
import { useGetProfileQuery, useMeQuery } from "../generated/graphql";
import { useAppStore } from "../store/AppStore";

const Home: React.FC<RouteProps> = () => {
  const appStore = useAppStore();
  const history = useHistory();
  const { data, error, loading, client } = useGetProfileQuery();

  if (loading) return <div>Loading...</div>;
  if (error)
    return (
      <div>
        <pre>
          {error.graphQLErrors.map(({ message }, i) => (
            <span key={i}>{message}</span>
          ))}
        </pre>
      </div>
    );

  if (!data?.profile)
    return <div>Something went wrong, Please try again later.</div>;

  const { firstName, lastName, email, id } = data.profile;

  return (
    <div>
      <h2>
        Hi there, {firstName} {lastName}!
      </h2>

      <button
        className="px-4 py-2 mt-4 text-white bg-green-500 rounded hover:opacity-70"
        onClick={async () => {
          await appStore.clearPersistedData();
          await client.clearStore();
          history.push(PathURL.login);
        }}
      >
        Logout
      </button>
    </div>
  );
};

export default Home;
