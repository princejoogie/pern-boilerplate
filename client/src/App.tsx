import React from "react";
import { BrowserRouter, Link, Route, Switch } from "react-router-dom";
import { HomePage, LoginPage, RegisterPage } from "./pages";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <div>
        <nav className="sticky top-0 w-full py-8 mb-8 bg-white shadow-md">
          <ul className="container flex items-center px-4 mx-auto space-x-4">
            <Link to="/" className="font-semibold hover:opacity-70">
              <p>Home</p>
            </Link>

            <Link to="/login" className="font-semibold hover:opacity-70">
              <p>Login</p>
            </Link>

            <Link to="/register" className="font-semibold hover:opacity-70">
              <p>Register</p>
            </Link>
          </ul>
        </nav>

        <main className="container px-4 mx-auto">
          <Switch>
            <Route path="/" exact component={HomePage} />
            <Route path="/login" component={LoginPage} />
            <Route path="/register" component={RegisterPage} />
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
