# Todo API with Magic Link Authentication

This project is a simple Todo API built with Express.js and PostgreSQL, featuring passwordless (magic link) authentication. The API supports Create, Read, Update, and Delete (CRUD) operations for Todo items.

## Table of Contents

- [Features](#features)
- [Requirements](#requirements)
- [Setup and Installation](#setup-and-installation)
- [Environment Variables](#environment-variables)
- [Running the Application](#running-the-application)
- [API Endpoints](#api-endpoints)
- [Testing the Endpoints](#testing-the-endpoints)
- [Version Control](#version-control)
- [License](#license)
- [Complete Code](#complete-code)

## Features

- Passwordless authentication via magic links
- CRUD operations for Todo items
- Secure JWT-based authentication
- PostgreSQL as the database
- Modular and clean code structure

## Requirements

- Node.js (v14 or higher)
- PostgreSQL (v12 or higher)
- npm (v6 or higher)

## Setup and Installation

1. Clone the repository:

   ```
   git clone https://github.com/your-username/todo-api.git
   cd todo-api
   ```

2. Install dependencies:

   ```
   npm install
   ```

3. Set up your PostgreSQL database:

   - Create a new PostgreSQL database (e.g., `todo_app`).
   - Create a `.env` file in the root of the project with the necessary environment variables (see [Environment Variables](#environment-variables) section).

4. Run the database migration script to create the required tables:
   ```
   psql -d todo_app -f init_db.sql
   ```

## Environment Variables

Create a `.env` file in the root directory of your project and add the following environment variables:

```
PORT=3000
DB_HOST=localhost
DB_PORT=5432
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_NAME=todo_app
JWT_SECRET=your_jwt_secret
EMAIL=your_email@example.com
EMAIL_PASSWORD=your_email_password
CLIENT_URL=http://localhost:3000
```

Replace `your_db_user`, `your_db_password`, `your_jwt_secret`, `your_email@example.com`, and `your_email_password` with your actual database credentials, JWT secret, and email credentials.

## Running the Application

1. Start the application:

   ```
   npm start
   ```

2. The server will be running at `http://localhost:3000`.

## API Endpoints

### Authentication

#### Register (Request a Magic Link)

- **Endpoint**: `/auth/register`
- **Method**: POST
- **Description**: Registers a new user and sends a magic link to their email.
- **Payload**:
  ```json
  {
    "email": "user@example.com"
  }
  ```

#### Login (Use the Magic Link)

- **Endpoint**: `/auth/login`
- **Method**: GET
- **Description**: Logs in the user using the token received via email.
- **Query Parameter**:
  - `token`: The token received in the magic link.

### Todos

#### Get All Todos

- **Endpoint**: `/todos`
- **Method**: GET
- **Description**: Retrieves all todos.

#### Get Todo by ID

- **Endpoint**: `/todos/:id`
- **Method**: GET
- **Description**: Retrieves a single todo by its ID.
- **Path Parameter**:
  - `id`: The ID of the todo.

#### Create a Todo

- **Endpoint**: `/todos`
- **Method**: POST
- **Description**: Creates a new todo.
- **Payload**:
  ```json
  {
    "title": "New Todo",
    "description": "Description of the new todo"
  }
  ```

#### Update a Todo

- **Endpoint**: `/todos/:id`
- **Method**: PUT
- **Description**: Updates an existing todo by its ID.
- **Path Parameter**:
  - `id`: The ID of the todo.
- **Payload**:
  ```json
  {
    "title": "Updated Todo",
    "description": "Updated description of the todo"
  }
  ```

#### Delete a Todo

- **Endpoint**: `/todos/:id`
- **Method**: DELETE
- **Description**: Deletes a todo by its ID.
- **Path Parameter**:
  - `id`: The ID of the todo.

## Testing the Endpoints

### Using Postman

1. **Register a User**:

   - **Method**: POST
   - **URL**: `http://localhost:3000/auth/register`
   - **Body** (raw, JSON):
     ```json
     {
       "email": "user@example.com"
     }
     ```

2. **Login with Magic Link**:

   - After registering, you will receive an email with the magic link. Use this link to log in.

3. **Get JWT Token**:

   - Once you log in using the magic link, you will receive a JWT token.

4. **Authenticated Requests**:

   - Include the JWT token in the Authorization header for all Todo operations:
     ```
     Authorization: Bearer your_jwt_token
     ```

5. **Create a Todo**:

   - **Method**: POST
   - **URL**: `http://localhost:3000/todos`
   - **Body** (raw, JSON):
     ```json
     {
       "title": "Learn Express.js",
       "description": "Complete CRUD operations with Express.js"
     }
     ```

6. **Get All Todos**:

- **Endpoint**: `/todos`
- **Method**: `GET`
- **Description**: Get all todos for the authenticated user, with support for pagination, search, and sorting.
- **Headers**:
  - `Authorization`: Bearer `<JWT token>`
- **Query Parameters**:
  - `page` (optional): The page number (default: 1).
  - `limit` (optional): The number of todos per page (default: 10).
  - `search` (optional): Search term to filter todos by title or description.
  - `sortBy` (optional): Field to sort by (default: "id").
  - `order` (optional): Sort order, either "asc" or "desc" (default: "asc").

#### Pagination

- **Endpoint**: `/todos?page=2&limit=5`
- **Description**: Get the second page with 5 todos per page.

#### Search

- **Endpoint**: `/todos?search=work`
- **Description**: Get todos where the title or description contains "work".

#### Sorting

- **Endpoint**: `/todos?sortBy=title&order=desc`
- **Description**: Get todos sorted by title in descending order.

#### Combined

- **Endpoint**: `/todos?page=1&limit=10&search=work&sortBy=title&order=asc`
- **Description**: Get the first page with 10 todos per page, where the title or description contains "work", sorted by title in ascending order.

7. **Get a Todo by ID**:

   - **Method**: GET
   - **URL**: `http://localhost:3000/todos/:id`

8. **Update a Todo**:

   - **Method**: PUT
   - **URL**: `http://localhost:3000/todos/:id`
   - **Body** (raw, JSON):
     ```json
     {
       "title": "Updated Todo",
       "description": "Updated description of the todo"
     }
     ```

9. **Delete a Todo**:
   - Method: DELETE
   - URL: `http://localhost:3000/todos/:id`

## Clone the repository:

```
git clone https://github.com/mub4shir/todoApi.git

```

### Directory Structure

```
.
├── config
│   ├── db.js
│   ├── mailer.js
├── controllers
│   ├── authController.js
│   ├── todoController.js
├── models
│   ├── userModel.js
│   ├── todoModel.js
├── routes
│   ├── authRoutes.js
│   ├── todoRoutes.js
├── utils
│   ├── tokenUtils.js
├── migrate.js
├── index.js
├── testDBConnection.js
├── package.json
├── .env
```

## Postman Documenter link:

```
https://documenter.getpostman.com/view/14909689/UVJWqKhr

```
