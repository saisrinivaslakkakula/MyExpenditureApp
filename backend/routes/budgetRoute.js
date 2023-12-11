const router = require("express").Router();

const {
  addCategorybyUserId,
  getCategoriesbyUserId,
  addExpensebyUserId,
  getExpensedByUserId
} = require("../controllers/budgetController")

router.route("/category").post(addCategorybyUserId).get(getCategoriesbyUserId);
router.route("/expense").post(addExpensebyUserId).get(getExpensedByUserId);

module.exports = router;
