import { useState } from "react";
import axios from "axios";

function Register({ goToLogin }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://127.0.0.1:5000/api/auth/register", {
        name,
        email,
        password,
      });

      alert("Registered Successfully");
      goToLogin();

    } catch (error) {
      alert("Error");
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-200">

      <div className="bg-blue-300 p-10 rounded-lg shadow-xl w-96 text-center">

        <h2 className="text-2xl font-bold mb-4">Register</h2>

        <form onSubmit={handleRegister}>
          <input placeholder="Name" className="w-full p-2 mb-3" onChange={(e) => setName(e.target.value)} />
          <input placeholder="Email" className="w-full p-2 mb-3" onChange={(e) => setEmail(e.target.value)} />
          <input placeholder="Password" type="password" className="w-full p-2 mb-3" onChange={(e) => setPassword(e.target.value)} />

          <button className="bg-green-500 text-white px-6 py-2 rounded">
            Register
          </button>
        </form>

        <p className="mt-4">
          Already have an account?{" "}
          <span onClick={goToLogin} className="text-blue-700 cursor-pointer">
            Login
          </span>
        </p>

      </div>
    </div>
  );
}

export default Register;