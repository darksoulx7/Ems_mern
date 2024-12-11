# Backend Setup

## Prerequisites

1. **Install Node.js (LTS version)**:
   - Download and install the latest LTS version of Node.js from the [official website](https://nodejs.org/).

2. **PostgreSQL**:
   - Ensure that PostgreSQL is installed and running on your machine. If not, follow the instructions on the [PostgreSQL website](https://www.postgresql.org/download/).

3. **.env Configuration**:
   - Update the `.env` file with your local PostgreSQL username and password:
     ```
     POSTGRES_USER=your_username
     POSTGRES_PASSWORD=your_password
     ```

## Installation Steps

1. **Install Dependencies**:
   - Navigate to the `backend` folder in your terminal:
     ```
     cd backend
     ```
   - Run the following command to install the required dependencies:
     ```
     npm install
     ```

2. **Run Database Seeder**:
   - Execute the following command to create the database and insert dummy data:
     ```
     npm run seeds
     ```

3. **Start the Server**:
   - After the seeding is complete, run the following command to start the server:
     ```
     npm start
     ```
