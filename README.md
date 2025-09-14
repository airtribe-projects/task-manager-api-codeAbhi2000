# Task Manager API

## Overview

Task Manager API's developed using Node.js and Express, it offers RESTful endpoints for creating, updating, deleting, and retrieving tasks. 


## Technologies Used

- Node.js
- Express.js

## Getting Started

1. **Clone the repository:**
    ```bash
    git clone https://github.com/Abhi2000/task-manager-api.git
    cd task-manager-api
    ```

2. **Install dependencies:**
    ```bash
    npm install
    ```

3. **Run the server:**
    ```bash
    npm run dev
    ```

## API Endpoints

- `GET /api/tasks` - Retrieve all tasks
- `POST /api/tasks` - Create a new task
- `GET /api/tasks/:id` - Retrieve a specific task by ID
- `PUT /api/tasks/:id` - Update a task by ID
- `DELETE /api/tasks/:id` - Delete a task by ID
- `GET /api/tasks?status=<status>` - Retrieve tasks filtered by status (e.g., `pending`, `completed`)
- `GET /api/tasks?sort=<asc | desc>` - Retrieve tasks sorted by creation or due date in ascending or descending order
- `GET /api/tasks/priority/:level` - Retrieve tasks filtered by priority level (e.g., `high`, `medium`, `low`)