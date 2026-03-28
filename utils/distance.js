function calculateDistance(lat1, lon1, lat2, lon2) {

  const R = 6371 // Earth radius in KM

  const toRad = (value) => (value * Math.PI) / 180 // Convert degrees to radians
  const dLat = toRad(lat2 - lat1) // Difference in latitude in radians
  const dLon = toRad(lon2 - lon1) // Difference in longitude in radians

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) + 
    Math.cos(toRad(lat1)) *
    Math.cos(toRad(lat2)) *
    Math.sin(dLon / 2) *
    Math.sin(dLon / 2)               // Haversine formula

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)) // Angular distance in radians

  return R * c // Distance in kilometers
}

module.exports = calculateDistance