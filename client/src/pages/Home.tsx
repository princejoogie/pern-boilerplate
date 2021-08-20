import React from "react";
import { useMeQuery } from "../generated/graphql";

const Home: React.FC = () => {
  const { data, error, loading } = useMeQuery();

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  return (
    <div>
      <p>{data?.me}</p>
    </div>
  );
};

export default Home;
