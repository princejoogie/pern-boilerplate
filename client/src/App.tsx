import React from "react";
import { BrowserRouter, Link, Route, Switch } from "react-router-dom";
import { PathURL } from "./constants";
import { HomePage, LoginPage, RegisterPage } from "./pages";

const App: React.FC = () => {
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
