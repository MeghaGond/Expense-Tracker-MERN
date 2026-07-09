import { useState } from "react";
import axios from "axios";

function Login({ goToRegister, goToDashboard }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://127.0.0.1:5000/api/auth/login",
        { email, password }
      );

      localStorage.setItem("token", res.data.token);
      alert("Login Successful");

      goToDashboard();

    } catch (error) {
      alert("Login Failed");
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-200">

      <div className="bg-purple-300 p-10 rounded-lg shadow-xl w-96 text-center">

        <h2 className="text-2xl font-bold mb-4">Login</h2>

        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            className="w-full p-2 mb-4 rounded"
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full p-2 mb-4 rounded"
            onChange={(e) => setPassword(e.target.value)}
          />

          <button className="bg-blue-500 text-white px-6 py-2 rounded">
            Login
          </button>
        </form>

        <p className="mt-4">
          Don't have an account?{" "}
          <span onClick={goToRegister} className="text-blue-700 cursor-pointer">
            Register
          </span>
        </p>

      </div>
    </div>
  );
}

export default Login;