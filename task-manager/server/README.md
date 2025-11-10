# Task Manager API

Backend API server for the Task Manager application.

## Features

- RESTful API for task management
- MongoDB integration
- CORS enabled
- Security headers with Helmet
- Request logging with Morgan
- Health check endpoint
- Error handling

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file based on `.env.example`:
```bash
cp .env.example .env
```

3. Update the `.env` file with your MongoDB connection string:
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/taskmanager
```

4. Start the development server:
```bash
npm run dev
```

5. Start the production server:
```bash
npm start
```

## API Endpoints

- `GET /health` - Health check endpoint
- `GET /api/tasks` - Get all tasks
- `POST /api/tasks` - Create a new task
- `PATCH /api/tasks/:id` - Update a task
- `DELETE /api/tasks/:id` - Delete a task

## Deployment

This server is configured to deploy on Render. Make sure to set the following environment variables in Render:

- `MONGODB_URI` - Your MongoDB Atlas connection string
- `NODE_ENV` - Set to `production`
- `PORT` - Render will automatically set this

## Environment Variables

- `PORT` - Server port (default: 5000)
- `NODE_ENV` - Environment (development/production)
- `MONGODB_URI` - MongoDB connection string

