import React, { useState } from "react";
import { ApolloError } from "@apollo/client";
import { useHistory, RouteProps } from "react-router-dom";
import { PathURL } from "../constants";
import { useLoginMutation } from "../generated/graphql";
import { useAppStore } from "../store/AppStore";
import { PulseLoader } from "react-spinners";
import { C } from "../components/C";
import { Form, Formik } from "formik";

interface FormFields {
  email: string;
  password: string;
}

const Login: React.FC<RouteProps> = () => {
  const initialValues: FormFields = {
    email: "",
    password: "",
  };
  const appStore = useAppStore();
  const history = useHistory();
  const [login] = useLoginMutation();
  const [errorMessage, setErrorMessage] = useState<string | undefined>(
    undefined
  );

  return (
    <div>
      <Formik<FormFields>
        initialValues={initialValues}
        validate={(values) => {
          const errors: any = {};

          if (!values.email.trim()) {
            errors["email"] = "Required";
          } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(
              values.email.trim()
            )
          ) {
            errors["email"] = "Invalid email address";
          }

          if (!values.password.trim()) errors["password"] = "Required";
          else if (values.password.trim().length < 6)
            errors["password"] = "Must be > 5 characters";

          return errors;
        }}
        onSubmit={async ({ password, email }, { setSubmitting }) => {
          try {
            const _email = email.trim();
            const _password = password.trim();

            const { data, errors } = await login({
              variables: {
                email: _email,
                password: _password,
              },
            });

            if (errors) setErrorMessage(errors[0].message);

            const accessToken = data?.login.accessToken;

            if (accessToken) {
              console.log(accessToken);
              await appStore.setAccessToken(accessToken);
              history.push(PathURL.home);
            } else {
              console.log("Something went wrong");
            }

            setSubmitting(false);
          } catch (err) {
            const _err = err as ApolloError;
            setErrorMessage(_err.message);
            setSubmitting(false);
          }
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          isSubmitting,
        }) => {
          return (
            <Form className="flex flex-col items-start space-y-4">
              <C className="flex flex-col items-start">
                <C.Label htmlFor="email">Email</C.Label>
                <C.Input
                  type="email"
                  name="email"
                  placeholder="john@email.com"
                  value={values.email}
                  onBlur={handleBlur}
                  onChange={handleChange}
                />
                {errors.email && touched.email && (
                  <C.ErrorMessage>{errors.email}</C.ErrorMessage>
                )}
              </C>

              <C className="flex flex-col items-start mt-3">
                <C.Label htmlFor="password">Password</C.Label>
                <C.Input
                  type="password"
                  name="password"
                  placeholder="******"
                  value={values.password}
                  onBlur={handleBlur}
                  onChange={handleChange}
                />
                {errors.password && touched.password && (
                  <C.ErrorMessage>{errors.password}</C.ErrorMessage>
                )}
              </C>

              <C.Button type="submit">
                {isSubmitting ? (
                  <PulseLoader color="#fff" size={8} />
                ) : (
                  <p>Register</p>
                )}
              </C.Button>

              {errorMessage && (
                <span className="text-xs text-red-500">{errorMessage}</span>
              )}
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default Login;
