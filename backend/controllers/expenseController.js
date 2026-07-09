const Expense = require("../models/Expense");

// ➕ Add Expense
exports.addExpense = async (req, res) => {
  try {
    const { title, amount, category } = req.body;

    const expense = new Expense({
      user: req.user.id,
      title,
      amount,
      category,
    });

    await expense.save();
    res.status(201).json(expense);

  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

// 📥 Get Expenses
exports.getExpenses = async (req, res) => {
  try {
    const expenses = await Expense.find({ user: req.user.id });
    res.json(expenses);

  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

// ❌ Delete
exports.deleteExpense = async (req, res) => {
  try {
    await Expense.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted successfully" });

  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

// ✏️ Update
exports.updateExpense = async (req, res) => {
  try {
    const { title, amount, category } = req.body;

    const expense = await Expense.findById(req.params.id);

    if (!expense) {
      return res.status(404).json({ message: "Not found" });
    }

    expense.title = title;
    expense.amount = amount;
    expense.category = category;

    const updated = await expense.save();

    res.json(updated);

  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};