const express = require("express")
const router = express.Router()

const {
  addSchool,
  getSchools,
} = require("../controllers/schoolController")

// POST → add school
router.post("/addSchool", addSchool)

// GET → list schools sorted by distance
router.get("/listSchools", getSchools)

module.exports = router
