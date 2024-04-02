import { useEffect } from "react";
// import { getInitialData } from "./utils";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NotesPage from "./Pages/notes";
import DetailNotesPage from "./Pages/detailNotes";
import ErrorPage from "./Pages/404";
import LoginPage from "./Pages/login";
import RegisterPage from "./Pages/register";
import { getNotes } from "./services/notes.service";
import { useInfo, useInfoDispatch } from "./context";
import LoadingPage from "./Pages/loading";

const App = () => {
  const token = localStorage.getItem("token");
  const dispatch = useInfoDispatch();
  const { isLoading, username, isOnline } = useInfo();

  useEffect(() => {
    if (token && username) {
      getNotes(token, dispatch);
    }
  }, [token, username]);

  return (
    <Router>
      {!isOnline && (
        <div className="z-20 fixed top-0 left-0 right-0">
          <LoadingPage opening={false}>Check Your Internet</LoadingPage>
        </div>
      )}
      <Routes>
        <Route
          path="/notes"
          element={
            !username || isLoading ? (
              <LoadingPage>Loading Data...</LoadingPage>
            ) : (
              <NotesPage />
            )
          }
        />
        <Route path="/notes/:id" element={
          !username || isLoading ? <LoadingPage>Loading Data...</LoadingPage> : <DetailNotesPage />} />
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </Router>
  );
};

export default App;
