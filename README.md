
# Europe Tour Destinations Visualization

A web application to visualize European travel destinations using interactive charts and maps with real-time updates.

## 📋 Prerequisites
*   **Docker Desktop** (Must be running)
*   **Git**

## 🚀 How to Run

### 1. Clone the Repository
```bash
git clone git@gitlab.ti.howest.be:ti/2025-2026/s3/web-technology/students/season-thapa/europeantourdestinationsvisualization.git
cd europeantourdestinationsvisualization

2. Configure Environment

Create a file named .env in the root folder and paste the following configuration:
code Ini
  
DB_ROOT_PASSWORD=your_root_password
DB_HOST=127.0.0.1
DB_USER=user
DB_PASSWORD=1234
DB_DATABASE=destinationdb
DB_PORT=3306
APP_PORT=3000
PORT=3000

3. Start the Application

Run this command to build the server and start the database containers:
code Bash    
docker-compose up --build  

4. Seed the Database

Open a new terminal window (keep the previous one running) and execute this command to fill the database with initial data:
code Bash
docker-compose exec app node seed.js

You should see: ✅ Done! Database seeded...

🌐 Usage
   Visualization Dashboard: http://localhost:63342/europeantourdestinationsvisualization/public/assets/index.html
   Add New Data: http://localhost:63342/europeantourdestinationsvisualization/public/assets/add-data.html