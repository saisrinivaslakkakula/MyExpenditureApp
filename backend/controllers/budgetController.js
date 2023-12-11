
const Expense = require("../models/Expense");
const Category = require("../models/Category");

exports.addCategorybyUserId = async (req, res) => {
    try {
      console.log(req.user.id); 
      const { name, budget } = req.body;
      const category = await Category.create({ user: req.user.id, name, budget });
      res.status(201).json({
        success: true,
        message: "Budget added successfully",
        data:category
      });
    } catch (error) {
      res.status(500).json({ error: "Failed to create category" });
    }
    //res.send(`user id is ${req.user.id}`)
  }

exports.getCategoriesbyUserId = async (req, res) => {
    try {
      const categories = await Category.find({ user: req.user.id });
      res.status(200).json(categories);
    } catch (error) {
      res.status(500).json({ error: "Failed to retrieve categories" });
    }
  }

exports.addExpensebyUserId = async (req, res) => {
    try {
      const { category, description, amount } = req.body;
      console.log(req.body)
      const expense = await Expense.create({
        category,
        description,
        amount,
        user: req.user.id,
      });
      res.status(201).json(expense);
    } catch (error) {
      console.log(error)
      res.status(500).json({ error: "Failed to create expense" });
    }
  }

exports.getExpensedByUserId = async (req, res) => {
    try {
      const expenses = await Expense.find({ user: req.user.id }).populate(
        "category"
      );
      res.status(200).json(expenses);
    } catch (error) {
      res.status(500).json({ error: "Failed to retrieve expenses" });
    }
  }