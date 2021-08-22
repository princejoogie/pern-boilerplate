import React, { useState } from "react";
import { Form, Formik } from "formik";
import { Link, RouteProps } from "react-router-dom";
import { C } from "../components/C";
import { PulseLoader } from "react-spinners";
import { useRegisterMutation } from "../generated/graphql";
import { ApolloError } from "@apollo/client";
import { PathURL } from "../constants";

interface FormFields {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

const TestRegister: React.FC<RouteProps> = () => {
  const initialValues: FormFields = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  };

  const [register] = useRegisterMutation();
  const [errorMessage, setErrorMessage] = useState<string | undefined>(
    undefined
  );
  const [success, setSuccess] = useState(false);

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

          if (!values.firstName.trim()) errors["firstName"] = "Required";
          if (!values.lastName.trim()) errors["lastName"] = "Required";
          if (!values.password.trim()) errors["password"] = "Required";
          else if (values.password.trim().length < 6)
            errors["password"] = "Must be > 5 characters";

          return errors;
        }}
        onSubmit={async (
          { email, password, firstName, lastName },
          { setSubmitting }
        ) => {
          try {
            const _email = email.trim();
            const _firstName = firstName.trim();
            const _lastName = lastName.trim();
            const _password = password.trim();

            const { data, errors } = await register({
              variables: {
                email: _email,
                firstName: _firstName,
                lastName: _lastName,
                password: _password,
              },
            });

            if (errors) setErrorMessage(errors[0].message);
            else setSuccess(true);
            console.log(data);
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
              <div className="flex items-start space-x-4">
                <C className="flex flex-col items-start">
                  <C.Label htmlFor="firstName">First name</C.Label>
                  <C.Input
                    type="text"
                    name="firstName"
                    placeholder="John"
                    value={values.firstName}
                    onBlur={handleBlur}
                    onChange={handleChange}
                  />
                  {errors.firstName && touched.firstName && (
                    <C.ErrorMessage>{errors.firstName}</C.ErrorMessage>
                  )}
                </C>

                <C className="flex flex-col items-start">
                  <C.Label htmlFor="lastName">Last name</C.Label>
                  <C.Input
                    type="text"
                    name="lastName"
                    placeholder="Doe"
                    value={values.lastName}
                    onBlur={handleBlur}
                    onChange={handleChange}
                  />
                  {errors.lastName && touched.lastName && (
                    <C.ErrorMessage>{errors.lastName}</C.ErrorMessage>
                  )}
                </C>
              </div>

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

              <C className="flex flex-col items-start">
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

              {success && (
                <span className="text-xs text-green-500">
                  Successfully registered. You can now proceed to{" "}
                  <Link to={PathURL.login}>
                    <span className="font-semibold text-blue-500 underline">
                      Login
                    </span>
                  </Link>
                </span>
              )}

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

export default TestRegister;
