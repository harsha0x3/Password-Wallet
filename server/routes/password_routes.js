const express = require("express");
const router = express.Router();
const {
  getAllPasswords,
  createPassword,
  deleted,
  update,
} = require("../controllers/passwordController");

router.route("/").get(getAllPasswords).post(createPassword);
router.route("/del").delete(deleted);
router.route("/:id").patch(update);

module.exports = router;
