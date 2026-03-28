# School Management API

A Node.js REST API to manage school data and sort schools by proximity using the Haversine formula. Built with Express and MySQL.

---

## What it does

- Add a school with its name, address, and coordinates
- Get a list of all schools sorted by distance from any given location
- Distance is calculated using the Haversine formula (great-circle distance between two points on Earth)

---

## Project Structure

```
├── app.js
├── config/
│   └── db.js
├── controllers/
│   └── schoolController.js
├── routes/
│   └── schoolRoutes.js
├── utils/
│   └── distance.js
├── .env
├── .env.example
└── package.json
```

---

## Tech Stack

- **Runtime** — Node.js
- **Framework** — Express.js
- **Database** — MySQL (via mysql2)
- **Environment** — dotenv
- **Hosting** — Railway

---

## Getting Started (Local)

### Prerequisites

- Node.js installed
- MySQL running locally (MySQL Workbench works fine)

### 1. Clone the repo

```bash
git clone https://github.com/Ritish-007/school-api-assignment
cd school-api
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up your `.env`

Copy the example file and fill in your MySQL credentials:

```bash
cp .env.example .env
```

```env
PORT=3000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=school_db
```

### 4. Create the database and table

Run this in MySQL Workbench (or any MySQL client):

```sql
CREATE DATABASE IF NOT EXISTS school_db;
USE school_db;

CREATE TABLE IF NOT EXISTS schools (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  address VARCHAR(255) NOT NULL,
  latitude FLOAT NOT NULL,
  longitude FLOAT NOT NULL
);
```

### 5. Start the server

```bash
node app.js
```

You should see:
```
Connected to the database successfully!
Server running on port 3000
```

---

## API Endpoints

### POST `/api/addSchool`

Adds a new school to the database.

**Request Body (JSON):**
```json
{
  "name": "ABC School",
  "address": "Delhi",
  "latitude": 28.6139,
  "longitude": 77.2090
}
```

**Response:**
```json
{
  "message": "School added successfully"
}
```

---

### GET `/api/listSchools`

Returns all schools sorted by distance from the provided coordinates.

**Query Parameters:**

| Param | Type | Description |
|-------|------|-------------|
| `latitude` | float | Your current latitude |
| `longitude` | float | Your current longitude |

**Example Request:**
```
GET /api/listSchools?latitude=28.6&longitude=77.2
```

**Response:**
```json
[
  {
    "id": 1,
    "name": "ABC School",
    "address": "Delhi",
    "latitude": 28.6139,
    "longitude": 77.209,
    "distance": "1.234km"
  },
  ...
]
```

---

## How Distance is Calculated

The `utils/distance.js` file uses the **Haversine formula** to calculate straight-line distance between two coordinates on Earth's surface. The result is in kilometers, rounded to 3 decimal places in the response.

---

## Deployment (Railway)

This project is deployed on [Railway](https://railway.app).


**Test the live endpoints:**

```
POST http://school-api-assignment-production-3cba.up.railway.app/api/addSchool
GET  http://school-api-assignment-production-3cba.up.railway.app/api/listSchools?latitude=28.6&longitude=77.2
```

### Environment variables on Railway

| Key | Description |
|-----|-------------|
| `DB_HOST` | MySQL host (from Railway MySQL service) |
| `DB_USER` | MySQL user |
| `DB_PASSWORD` | MySQL password |
| `DB_NAME` | Database name |
| `DB_PORT` | MySQL port |

---

## Testing with Postman

Import these two requests into Postman:

**Add School**
- Method: `POST`
- URL: `http://school-api-assignment-production-3cba.up.railway.app/api/addSchool`
- Body: raw JSON with `name`, `address`, `latitude`, `longitude`

**List Schools**
- Method: `GET`
- URL: `http://school-api-assignment-production-3cba.up.railway.app/api/listSchools?latitude=28.6139&longitude=77.2090`

Set `base_url` as a Postman environment variable to switch between local and production easily.

---

## Known Limitations

- No authentication on endpoints (open API)
- Distance is straight-line, not road distance
- Coordinates are stored as FLOAT — minor precision loss possible for very close schools