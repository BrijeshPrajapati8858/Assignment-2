const express = require("express");
const {
  createEmp,
  empDetails,
  updateEmp,
  getAllEmp,
  deleteEmp,
  getSingleEmp,
} = require("../controllers/epmController");


const router = express.Router();

router.route("/create").post(createEmp);
router.route("/emplist").get(getAllEmp);
router.route("/update/:id").put(updateEmp);
router.route("/emp/:id").get(getSingleEmp);
router.route("/emp/:id").delete(deleteEmp)

module.exports = router;
