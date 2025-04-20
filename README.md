# Little Lemon Restaurant Web App

## Overview:
The final project will be a web application built for a fictitious restaurant called Little Lemon. The restaurant is about to have its grand opening, and the owners desperately need a way for customers to view restaurant information and book table reservations. To solve Little Lemon’s problem, I will build a web application that allows customers to explore the restaurant’s general information, view its menu, create a user account, and book table reservations.
The core technologies used to build the multi-page web application will be based on React, Node.js, Express, and Prisma. The programming and style sheet languages and syntax extensions used to code this project will be HTML, CSS, JavaScript, and JSX. In addition, the application will implement API endpoints, CRUD operations, and authentication using token cookies, as learned in class. 

## Instructions:
Special instructions for running or testing your project:
- 1 GET Endpoint: Lists all items can be found in both /menu and /reservations
- 1 POST Endpoint: Inserts one item with th euse of requireAuth middleware can be found in /reservations

## Setup:
Setup the following environment variables in the corresponding folder.

## Client .env
```
REACT_APP_API_URL=http://localhost:8000
```

## API .env
```
DATABASE_URL=mysql://root:123456@localhost:3306/security
JWT_SECRET=very_long_secret
JWT_REFRESH_SECRET=very_long_secret_for_refresh
```



