# ECommerce_Angular_project

Welcome to our ECommerce Angular project, where you can buy your favorite laptops hassle-free! This project utilizes Angular for the frontend, ExpressJS for the backend, and PostgreSQL for the database.

## How to running this project?

1. Preparation:
    - Download [PostgreSQL](https://www.postgresql.org/download/) in that link for your OS.
    - Download [PgAdmin 4](https://www.pgadmin.org/download/pgadmin-4-windows/) which help you run the sql file.
    - Download [NodeJS](https://nodejs.org/en/download) which is a package to have all of framework or library about JS.

1. Create database:
- Open PgAdmin 4 and create a database with name 'ecommerce_project'.
- Open the Query SQL
- Navigate to the db_ecommerce.sql file in this folder.
- Execute the SQL file to set up the database and sample data.

2. Backend:
- Open the be_ecommerce folder in VSCode.
- Open the Terminal then run this script to install all of necessary package and run the Back end:
npm install
npm start

3. Front ent:
- Open the fe_ecommerce folder in another VSCode window. (The 2 folders must run parallel to each other)
- Open the Terminal then run this script to install all of necessary package and run the Front end:
npm i
ng serve

4. Testing:
To run tests, use Jest with the following command:
jest
jest --coverage