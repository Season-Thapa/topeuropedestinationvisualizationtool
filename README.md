1. Setup Project

git clone git@gitlab.ti.howest.be:ti/2025-2026/s3/web-technology/students/season-thapa/europeantourdestinationsvisualization.git
cd europeantourdestinationsvisualization
npm install

2. Configure Environment

Create a .env file in the root folder and add this:
DB_ROOT_PASSWORD=your_root_password
DB_HOST=127.0.0.1
DB_USER=user
DB_PASSWORD=1234
DB_DATABASE=destinationdb
DB_PORT=3306
APP_PORT=3000
PORT=3000

3. Start Database (Docker)

   Start only the database container to keep port 3000 free for your local server.
   docker-compose up db -d

4. Seed Database

Run the seed script locally to fill the database.
node seed.js

5. Run Server

Start the application.
node server.js

6. Access Application

   Visualization Dashboard: http://localhost:63342/europeantourdestinationsvisualization/public/assets/index.html
   Add New Data: http://localhost:63342/europeantourdestinationsvisualization/public/assets/add-data.html
