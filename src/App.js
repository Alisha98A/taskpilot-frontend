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

// Task Pages
import TaskList from "./pages/tasks/TaskList";
import TaskDetail from "./pages/tasks/TaskDetail";
import TaskCreate from "./pages/tasks/TaskCreate.js";
import TaskEdit from "./pages/tasks/TaskEdit";

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

            {/* Tasks */}
            <PrivateRoute exact path="/tasks" component={TaskList} />
            <PrivateRoute exact path="/tasks/create" component={TaskCreate} />
            <PrivateRoute exact path="/tasks/:id" component={TaskDetail} />
            <PrivateRoute exact path="/tasks/:id/edit" component={TaskEdit} />

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