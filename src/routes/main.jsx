import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import HomePage from "./pages/home-page";
import LoginPage from "./pages/login-page";
import NotFoundPage from "./pages/404-page";
import Middleware from "./middleware";
import SignupPage from "./pages/signup-page";

export default function MainRouter() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <Middleware>
              <HomePage />
            </Middleware>
          }
        />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
}


// LOGIN 

// If client does not has the access token in local stoage the app will redirect them to login route
// if client does have the accessToke then the app will give first api to check this token
