# Zone Management Application

A full-stack application to manage zones with the ability to create, delete, and visualize them using an SVG interface.

## Features

- Create zones by clicking to define their vertices.
- Delete existing zones.
- Visualize zones on a canvas.

## Technologies Used

- **Frontend**: React
- **Backend**: Node.js, Express
- **Database**: CSV file for persistence

## Prerequisites

- [Node.js](https://nodejs.org/en/) (v14 or higher)
- npm (comes with Node.js)

## Setup Instructions

### Clone the Repository

```bash
git clone
cd <project-directory>
```

## Install Dependencies
Backend: Navigate to the backend folder and install dependencies.

```bash
cd backend
npm install
```

Frontend: Navigate to the frontend folder and install dependencies.
```bash
cd frontend
npm install
```

### Environment Variables
Create a .env file in the frontend directory and add the following line, updating the URL as needed:

```
REACT_APP_BACKEND_URL=http://localhost:3000
```

### Running the Application
#### Start the Backend Server

Navigate to the backend folder and start the server:

```bash
cd backend
node server.js
```

Make sure your backend server is running on port 3000.

### Start the Frontend Application

In a separate terminal, navigate to the frontend folder and start the React app:

```bash
cd frontend
npm start
```
The frontend application will run on http://localhost:3001.

## API Endpoints
- GET /zones: Fetch all zones
- POST /zones: Create a new zone
- DELETE /zones/: Delete a zone by ID


## Testing
Running Tests
You can run tests for the backend and frontend by navigating to their respective directories and using:

```bash
cd backend
npm test
```
