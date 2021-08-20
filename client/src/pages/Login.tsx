import React, { useState } from "react";
import { RouteProps } from "react-router";
import { useLoginMutation } from "../generated/graphql";

const Login: React.FC<RouteProps> = () => {
  const [login] = useLoginMutation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    setLoading(() => true);
    e.preventDefault();
    try {
      const _email = email.trim();
      const _password = password.trim();

      const { data } = await login({
        variables: {
          email: _email,
          password: _password,
        },
      });

      const accessToken = data?.login.accessToken;

      if (accessToken) {
        console.log(accessToken);
      } else {
        console.log("Something went wrong");
      }

      setLoading(() => false);
    } catch (err) {
      console.log({ ...err });
      setLoading(() => false);
    }
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <div className="flex flex-col items-start">
          <label htmlFor="email" className="text-sm text-gray-500">
            Email
          </label>
          <input
            value={email}
            onChange={({ target: { value } }) => setEmail(value)}
            id="email"
            type="email"
            className="p-2 mt-1 bg-white rounded shadow"
            placeholder="john@email.com"
          />
        </div>

        <div className="flex flex-col items-start mt-3">
          <label htmlFor="password" className="text-sm text-gray-500">
            Password
          </label>
          <input
            value={password}
            onChange={({ target: { value } }) => setPassword(value)}
            id="password"
            type="password"
            className="p-2 mt-1 bg-white rounded shadow"
            placeholder="******"
          />
        </div>

        <button
          type="submit"
          className="px-4 py-2 mt-4 text-white bg-green-500 rounded hover:opacity-70"
        >
          {loading ? "Loading" : "Login"}
        </button>
      </form>
    </div>
  );
};

export default Login;
