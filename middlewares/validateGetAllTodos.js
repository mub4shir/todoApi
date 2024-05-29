const { query, validationResult } = require("express-validator");

const validateGetAllTodos = [
  query("page")
    .optional()
    .isInt({ min: 1 })
    .withMessage("Page must be a positive integer"),
  query("limit")
    .optional()
    .isInt({ min: 1 })
    .withMessage("Limit must be a positive integer"),
  query("search")
    .optional()
    .isString()
    .withMessage("Search term must be a string"),
  query("sortBy")
    .optional()
    .isIn(["id", "title", "createdAt"])
    .withMessage("Invalid sort field"),
  query("order")
    .optional()
    .isIn(["asc", "desc"])
    .withMessage("Invalid order value"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

module.exports = validateGetAllTodos;
