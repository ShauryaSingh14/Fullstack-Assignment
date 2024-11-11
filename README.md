# Fullstack-Assignment

Prerequisites
- Node.js (v14 or higher recommended)
- Angular CLI (v12 or higher recommended)
- MySQL/PostgreSQL (or another SQL database supported by Sequelize)

Setup Instructions
1. Clone the Repository
     `git clone -b master <repository-url>
     `
     
     `
     cd <repository-name>
     `
   
2. Install Dependencies
Install dependencies for both the server and client: 
- Backend (Express)
`
cd server`
`
npm install`
`
- Frontend (Angular)
`
cd client`
`
npm install
`
3. Database Setup
Ensure your SQL database is running.

 - Configure your database connection settings in server/config/config.json for Sequelize. Adjust database, username, password, and dialect (e.g., mysql, postgres).
4. Running the Application
Open two terminal windows or tabs:
- Start the Backend (Express Server)
`
cd server`
`
npm start`
- Start the Frontend (Angular App)
`
cd client
`
`
ng s
`

By default:
The server runs on http://localhost:2301.
The client runs on http://localhost:4200.
