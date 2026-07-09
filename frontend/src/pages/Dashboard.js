import { useState, useEffect } from "react";
import axios from "axios";

function Dashboard() {
  const [expenses, setExpenses] = useState([]);
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [editId, setEditId] = useState(null);

  const [income, setIncome] = useState(0);
  const [filter, setFilter] = useState("All");
  const [dateFilter, setDateFilter] = useState("");

  // 🎮 GAME
  const [showGame, setShowGame] = useState(false);
  const [number, setNumber] = useState(Math.floor(Math.random() * 10) + 1);
  const [guess, setGuess] = useState("");
  const [message, setMessage] = useState("");

  const token = localStorage.getItem("token");

  // 🔹 GET EXPENSES
  const getExpenses = async () => {
    try {
      const res = await axios.get("http://127.0.0.1:5000/api/expenses", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setExpenses(res.data);
    } catch (err) {
      alert("Error fetching expenses");
    }
  };

  useEffect(() => {
    if (token) getExpenses();
  }, []);

  // 🔹 ADD / UPDATE
  const addExpense = async (e) => {
    e.preventDefault();

    if (!title || !amount || !category) {
      alert("Please fill all fields");
      return;
    }

    try {
      if (editId) {
        await axios.put(
          `http://127.0.0.1:5000/api/expenses/${editId}`,
          { title, amount, category },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setEditId(null);
      } else {
        await axios.post(
          "http://127.0.0.1:5000/api/expenses",
          { title, amount, category },
          { headers: { Authorization: `Bearer ${token}` } }
        );
      }

      setTitle("");
      setAmount("");
      setCategory("");
      getExpenses();
    } catch (err) {
      alert("Error adding expense");
    }
  };

  // 🔹 DELETE
  const deleteExpense = async (id) => {
    try {
      await axios.delete(`http://127.0.0.1:5000/api/expenses/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      getExpenses();
    } catch (err) {
      alert("Delete failed");
    }
  };

  // 🔹 LOGOUT
  const logout = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };

  // 🔹 CALCULATIONS
  const totalExpense = expenses.reduce(
    (sum, exp) => sum + Number(exp.amount),
    0
  );

  const balance = income - totalExpense;

  // 🔹 FILTER
  const filteredExpenses = expenses.filter((exp) => {
    const categoryMatch = filter === "All" || exp.category === filter;
    const dateMatch =
      !dateFilter ||
      new Date(exp.date).toISOString().slice(0, 10) === dateFilter;

    return categoryMatch && dateMatch;
  });

  // 🎮 GAME LOGIC
  const checkGuess = () => {
    if (Number(guess) === number) {
      setMessage("🎉 Correct!");
      setNumber(Math.floor(Math.random() * 10) + 1);
    } else {
      setMessage("❌ Try Again");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-500 to-purple-600 p-6">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-6 text-white">
        <h1 className="text-3xl font-bold">💰 Expense Tracker</h1>

        <div>
          <button
            onClick={() => setShowGame(!showGame)}
            className="bg-yellow-400 px-4 py-2 rounded-lg mr-3"
          >
            🎮 Game
          </button>

          <button
            onClick={logout}
            className="bg-red-500 px-4 py-2 rounded-lg"
          >
            Logout
          </button>
        </div>
      </div>

      {/* GAME */}
      {showGame && (
        <div className="bg-white p-4 rounded-xl shadow mb-6 text-center">
          <h2 className="text-xl font-bold mb-2">Guess Number (1-10)</h2>

          <input
            type="number"
            value={guess}
            onChange={(e) => setGuess(e.target.value)}
            className="border p-2 mr-2"
          />

          <button
            onClick={checkGuess}
            className="bg-green-500 text-white px-4 py-2 rounded"
          >
            Check
          </button>

          <p className="mt-2">{message}</p>
        </div>
      )}

      {/* SUMMARY */}
      <div className="grid grid-cols-3 gap-4 mb-6">

        <div className="bg-white p-4 rounded-xl shadow">
          <p className="text-gray-500">Income</p>
          <input
            type="number"
            placeholder="Enter Income"
            className="border p-2 w-full mt-2"
            onChange={(e) => setIncome(e.target.value)}
          />
          <h2 className="text-green-600 font-bold mt-2">₹{income}</h2>
        </div>

        <div className="bg-white p-4 rounded-xl shadow">
          <p className="text-gray-500">Expense</p>
          <h2 className="text-red-500 text-xl font-bold mt-4">
            ₹{totalExpense}
          </h2>
        </div>

        <div className="bg-white p-4 rounded-xl shadow">
          <p className="text-gray-500">Balance</p>
          <h2 className="text-blue-600 text-xl font-bold mt-4">
            ₹{balance}
          </h2>
        </div>

      </div>

      {/* FORM */}
      <form
        onSubmit={addExpense}
        className="bg-white p-4 rounded-xl shadow mb-6 flex gap-3 flex-wrap"
      >
        <input
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border p-2 flex-1"
        />

        <input
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="border p-2 flex-1"
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border p-2 flex-1"
        >
          <option value="">Category</option>
          <option value="Food">Food</option>
          <option value="Travel">Travel</option>
          <option value="Shopping">Shopping</option>
        </select>

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 rounded-lg"
        >
          {editId ? "Update" : "Add"}
        </button>
      </form>

      {/* FILTER */}
      <div className="mb-4 flex gap-3">
        <select
          onChange={(e) => setFilter(e.target.value)}
          className="p-2 rounded"
        >
          <option value="All">All</option>
          <option value="Food">Food</option>
          <option value="Travel">Travel</option>
          <option value="Shopping">Shopping</option>
        </select>

        <input
          type="date"
          onChange={(e) => setDateFilter(e.target.value)}
          className="p-2 rounded"
        />
      </div>

      {/* LIST */}
      <div className="bg-white p-4 rounded-xl shadow">
        {filteredExpenses.map((exp) => (
          <div
            key={exp._id}
            className="flex justify-between items-center border-b py-3"
          >
            <div>
              <p className="font-bold">{exp.title}</p>
              <p className="text-gray-500 text-sm">{exp.category}</p>
            </div>

            <div className="flex items-center gap-4">
              <p className="font-semibold">₹{exp.amount}</p>

              <button
                onClick={() => {
                  setEditId(exp._id);
                  setTitle(exp.title);
                  setAmount(exp.amount);
                  setCategory(exp.category);
                }}
                className="text-blue-500"
              >
                Edit
              </button>

              <button
                onClick={() => deleteExpense(exp._id)}
                className="text-red-500"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}

export default Dashboard;