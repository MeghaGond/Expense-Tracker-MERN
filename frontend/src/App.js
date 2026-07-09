import { useState } from "react";
import Welcome from "./components/Welcome";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";

function App() {
  const token = localStorage.getItem("token");
  const [screen, setScreen] = useState("welcome");

  if (token && screen === "dashboard") {
    return <Dashboard />;
  }

  if (screen === "welcome") {
    return <Welcome onFinish={() => setScreen("login")} />;
  }

  if (screen === "login") {
    return (
      <Login
        goToRegister={() => setScreen("register")}
        goToDashboard={() => setScreen("dashboard")}
      />
    );
  }

  return <Register goToLogin={() => setScreen("login")} />;
}

export default App;










