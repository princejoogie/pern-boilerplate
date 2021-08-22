import React from "react";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { BrowserRouter, Link, Route, Switch } from "react-router-dom";
import { PathURL } from "./constants";
import { HomePage, LoginPage, RegisterPage } from "./pages";
import { useAppStore } from "./store/AppStore";
import { PulseLoader } from "react-spinners";

const App: React.FC = () => {
  const appStore = useAppStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.post(
          "http://localhost:4000/refresh-token",
          null,
          { withCredentials: true }
        );
        appStore.setAccessToken(data.accessToken);
        setLoading(false);
      } catch (err) {
        console.log({ ...err });
      }
    })();
  }, []);

  if (loading) {
    return (
      <div className="grid w-screen h-screen place-items-center">
        <PulseLoader />
      </div>
    );
  }

  return (
    <BrowserRouter>
      <div>
        <nav className="sticky top-0 w-full py-8 mb-8 bg-white shadow-md">
          <ul className="container flex items-center px-4 mx-auto space-x-4">
            <Link to={PathURL.home} className="font-semibold hover:opacity-70">
              <p>Home</p>
            </Link>

            <Link to={PathURL.login} className="font-semibold hover:opacity-70">
              <p>Login</p>
            </Link>

            <Link
              to={PathURL.register}
              className="font-semibold hover:opacity-70"
            >
              <p>Register</p>
            </Link>
          </ul>
        </nav>

        <main className="container px-4 mx-auto">
          <Switch>
            <Route path={PathURL.home} exact component={HomePage} />
            <Route path={PathURL.login} component={LoginPage} />
            <Route path={PathURL.register} component={RegisterPage} />
            <Route path="*">
              <code>404 Page not found.</code>
            </Route>
          </Switch>
        </main>
      </div>
    </BrowserRouter>
  );
};

export default App;
