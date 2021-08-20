import React, { useState } from "react";
import { RouteProps } from "react-router";
import { useRegisterMutation } from "../generated/graphql";

const Register: React.FC<RouteProps> = () => {
  const [register] = useRegisterMutation();
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    setLoading(() => true);
    e.preventDefault();
    try {
      const _email = email.trim();
      const _firstName = firstName.trim();
      const _lastName = firstName.trim();
      const _password = password.trim();

      const response = await register({
        variables: {
          email: _email,
          firstName: _firstName,
          lastName: _lastName,
          password: _password,
        },
      });

      console.log(response);
      setLoading(() => false);
    } catch (err) {
      console.log({ ...err });
      setLoading(() => false);
    }
  };

  return (
    <div>
      <form onSubmit={onSubmit} className="flex flex-col items-start space-y-4">
        <div className="flex items-start space-x-4">
          <div className="flex flex-col items-start">
            <label htmlFor="firstName" className="text-sm text-gray-500">
              First name
            </label>
            <input
              value={firstName}
              onChange={({ target: { value } }) => setFirstName(value)}
              id="firstName"
              type="text"
              className="p-2 mt-1 bg-white rounded shadow"
              placeholder="John"
            />
          </div>

          <div className="flex flex-col items-start">
            <label htmlFor="lastName" className="text-sm text-gray-500">
              Last name
            </label>
            <input
              value={lastName}
              onChange={({ target: { value } }) => setLastName(value)}
              id="lastName"
              type="text"
              className="p-2 mt-1 bg-white rounded shadow"
              placeholder="Doe"
            />
          </div>
        </div>

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

        <div className="flex flex-col items-start">
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
          {loading ? "Loading" : "Register"}
        </button>
      </form>
    </div>
  );
};

export default Register;
