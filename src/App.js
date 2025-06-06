import { useEffect } from "react";
import { Route, Switch, useLocation } from "react-router-dom";
import Container from "react-bootstrap/Container";
import styles from "./App.module.css";

import NavBar from "./components/NavBar";
import PrivateRoute from "./components/PrivateRoute";

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

// Note Pages
import NoteList from "./pages/notes/NoteList";
import NoteDetail from "./pages/notes/NoteDetail";
import NoteCreate from "./pages/notes/NoteCreate.js";
import NoteEdit from "./pages/notes/NoteEdit";
import NoteDelete from "./pages/notes/NoteDelete";

// Contact Page
import ContactForm from "./pages/contact/ContactForm";

// Context
import { useUserLoaded } from "./contexts/CurrentUserContext";

function App() {
  const location = useLocation();
  const userLoaded = useUserLoaded();

  useEffect(() => {
    document.body.classList.toggle("no-scroll", location.pathname === "/");
  }, [location.pathname]);

  if (!userLoaded) return null;

  return (
    <div className={styles.App}>
      <NavBar />

      {location.pathname === "/" ? (
        <WelcomePage />
      ) : (
        <Container className={styles.Main}>
          <Switch>
            {/* Home */}
            <Route exact path="/" component={WelcomePage} />

            {/* Dashboard */}
            <PrivateRoute exact path="/dashboard" component={Dashboard} />

            {/* Tasks */}
            <PrivateRoute exact path="/tasks" component={TaskList} />
            <PrivateRoute exact path="/tasks/create" component={TaskCreate} />
            <PrivateRoute exact path="/tasks/:id" component={TaskDetail} />
            <PrivateRoute exact path="/tasks/:id/edit" component={TaskEdit} />

            {/* Notes */}
            <PrivateRoute exact path="/notes" component={NoteList} />
            <PrivateRoute exact path="/notes/create" component={NoteCreate} />
            <PrivateRoute exact path="/notes/:id" component={NoteDetail} />
            <PrivateRoute exact path="/notes/:id/edit" component={NoteEdit} />
            <PrivateRoute exact path="/notes/:id/delete" component={NoteDelete} />

            {/* Contact */}
            <PrivateRoute exact path="/contact" component={ContactForm} />

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