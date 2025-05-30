import { useEffect } from "react";
import { Route, Switch, useLocation } from "react-router-dom";
import Container from "react-bootstrap/Container";
import styles from "./App.module.css";

import NavBar from "./components/NavBar";
import PrivateRoute from "./components/PrivateRoute";

import { useCurrentUser } from "./contexts/CurrentUserContext";
import "./api/axiosDefaults";

// Pages
import WelcomePage from "./pages/home/WelcomePage";
import Dashboard from "./pages/home/Dashboard";
import SignUpForm from "./pages/auth/SignUpForm";
import SignInForm from "./pages/auth/SignInForm";

function App() {
  const currentUser = useCurrentUser();
  const location = useLocation();

  const isWelcomePage = location.pathname === "/" && !currentUser;

  useEffect(() => {
    document.body.classList.toggle("no-scroll", isWelcomePage);
  }, [isWelcomePage]);

  return (
    <div className={styles.App}>
      <NavBar />

      {isWelcomePage ? (
        <WelcomePage />
      ) : (
        <Container className={styles.Main}>
          <Switch>
            {/* Home / Dashboard */}
            <Route exact path="/" render={() => <Dashboard />} />

            {/* Auth */}
            <Route exact path="/signin" component={SignInForm} />
            <Route exact path="/signup" component={SignUpForm} />

            {/* Fallback */}
            <Route render={() => <p>Page not found!</p>} />
          </Switch>
        </Container>
      )}
    </div>
  );
}

export default App;