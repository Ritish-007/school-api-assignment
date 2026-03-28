const db = require("../config/db")
const calculateDistance = require("../utils/distance")

// Adding a School 
exports.addSchool = (req, res) => {
  const { name, address, latitude, longitude } = req.body

  if (!name || !address || !latitude || !longitude) {
    return res.status(400).json({ message: "All fields are required" })
  }

  const query =
    "INSERT INTO schools (name, address, latitude, longitude) VALUES (?, ?, ?, ?)"

  db.query(query, [name, address, latitude, longitude], (err, result) => {
    if (err) {
      return res.status(500).json({ error: err })
    }
    res.json({ message: "School added successfully" })
  });
};

// Get Schools sorted by distance
exports.getSchools = (req, res) => {
  const { latitude, longitude } = req.query

  if (!latitude || !longitude) {
    return res.status(400).json({ message: "Latitude and Longitude required" })
  }

  const query = "SELECT * FROM schools"

  db.query(query, (err, results) => {
    if (err) {
      return res.status(500).json({ error: err })
    }

    const schoolsWithDistance = results.map((school) => {
      const distance = calculateDistance(
        latitude,
        longitude,
        school.latitude,
        school.longitude
      )
      return { ...school, distance }
    })

    schoolsWithDistance.sort((a, b) => a.distance - b.distance)

    res.json(schoolsWithDistance.map(school => 
      ({ ...school, distance: school.distance.toFixed(3) + "km" })
    ))
  })
}

