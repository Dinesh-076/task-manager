# Task Manager Application

This is a task manager application built with React for the frontend and Express.js for the backend. The application allows users to create, update, delete, and manage tasks.

## Features

- User authentication with Google OAuth and Passport.js
- Task creation, updating, deletion and view
- Task status management
- Responsive design

## Tech Stack

- Frontend: React, CSS
- Backend: Express.js, PostgreSQL
- Authentication: Passport.js, Google OAuth
- Other: bcryptjs, jsonwebtoken


## Setup and Run

### Prerequisites

- Node.js and npm installed on your machine
- PostgreSQL installed and running

### Backend Setup

1. Clone the repository:

   git clone https://github.com/Dinesh-076/task-manager.git
   cd task-manager/server

2.Install dependencies:

npm install

3. Set up the PostgreSQL database:
   CREATE DATABASE task_manager;
   
4. Create a .env file in the server directory with the following content:

    GOOGLE_CLIENT_ID="your_google_client_id"
    GOOGLE_CLIENT_SECRET="your_google_client_secret"
    PG_USER="your_database_url"
    PG_HOST="localhost"
    PG_DATABASE="task-manager"
    PG_PASSWORD="your_database_password"
    PG_PORT="5432"

5. Start the backend server:
   nodemon index.js

### Frontend Setup

1. Navigate to the client directory:
  cd ../client
2. Install dependencies:
  npm install
3. Start the frontend development server:
   npm start

The application should now be running.
You can access it at http://localhost:3000.
