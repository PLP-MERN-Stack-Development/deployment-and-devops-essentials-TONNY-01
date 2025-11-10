# Task Manager - MERN Stack Application

A full-stack Task Manager application built with MongoDB, Express.js, React, and Node.js. This project demonstrates deployment to production using Render (backend) and Vercel (frontend), along with CI/CD pipelines using GitHub Actions.

## 🚀 Live Deployment

- **Frontend**: [Deployed on Vercel](https://your-app.vercel.app) (Update with your URL)
- **Backend API**: [Deployed on Render](https://your-api.onrender.com) (Update with your URL)
- **Health Check**: `https://your-api.onrender.com/health`

## 📋 Features

- ✅ Create, read, update, and delete tasks
- ✅ Task status management (pending, in-progress, completed)
- ✅ Due date tracking
- ✅ Modern, responsive UI with Material-UI
- ✅ RESTful API with Express.js
- ✅ MongoDB database integration
- ✅ Production-ready deployment configuration
- ✅ CI/CD pipelines with GitHub Actions

## 🏗️ Project Structure

```
.
├── task-manager/
│   ├── client/          # React frontend application
│   │   ├── src/
│   │   ├── public/
│   │   ├── package.json
│   │   └── vercel.json
│   └── server/          # Express.js backend API
│       ├── server.js
│       ├── package.json
│       └── .env.example
├── .github/
│   └── workflows/       # GitHub Actions CI/CD workflows
├── render.yaml          # Render deployment configuration
├── DEPLOYMENT.md        # Detailed deployment guide
└── README.md
```

## 🛠️ Tech Stack

### Frontend
- React 19.2.0
- Material-UI (MUI) 7.3.5
- Axios for API calls
- React Router DOM

### Backend
- Node.js 18+
- Express.js 4.18.2
- MongoDB with Mongoose
- CORS, Helmet, Morgan middleware

### Deployment
- **Backend**: Render
- **Frontend**: Vercel
- **Database**: MongoDB Atlas
- **CI/CD**: GitHub Actions

## 📦 Getting Started

### Prerequisites

- Node.js 18.x or higher
- npm or yarn
- MongoDB Atlas account (free tier available)
- GitHub account
- Render account (for backend)
- Vercel account (for frontend)

### Local Development

1. **Clone the repository**:
   ```bash
   git clone <your-repo-url>
   cd deployment-and-devops-essentials-TONNY-01-1
   ```

2. **Set up the backend**:
   ```bash
   cd task-manager/server
   npm install
   cp .env.example .env
   # Edit .env with your MongoDB connection string
   npm start
   ```

3. **Set up the frontend**:
   ```bash
   cd task-manager/client
   npm install
   # Create .env file with REACT_APP_API_URL=http://localhost:5000/api
   npm start
   ```

4. **Access the application**:
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000
   - Health Check: http://localhost:5000/health

## 🚀 Deployment

For detailed deployment instructions, see [DEPLOYMENT.md](./DEPLOYMENT.md).

### Quick Deployment Steps

1. **Deploy Backend to Render**:
   - Connect GitHub repository to Render
   - Set build command: `cd task-manager/server && npm install`
   - Set start command: `cd task-manager/server && npm start`
   - Add environment variables (MONGODB_URI, NODE_ENV)

2. **Deploy Frontend to Vercel**:
   - Connect GitHub repository to Vercel
   - Set root directory: `task-manager/client`
   - Add environment variable: `REACT_APP_API_URL` (your Render backend URL)

3. **Update API Configuration**:
   - Update `task-manager/client/vercel.json` with your backend URL
   - Update environment variables in Vercel dashboard

## 📚 API Endpoints

- `GET /health` - Health check endpoint
- `GET /api/tasks` - Get all tasks
- `POST /api/tasks` - Create a new task
- `PATCH /api/tasks/:id` - Update a task
- `DELETE /api/tasks/:id` - Delete a task

## 🔄 CI/CD Pipeline

The project includes GitHub Actions workflows for:

- **Frontend CI**: Tests and builds the React application
- **Backend CI**: Tests the Express server
- **Frontend CD**: Automatically deploys to Vercel on push to main
- **Backend CD**: Automatically deploys to Render on push to main

## 📝 Environment Variables

### Backend (.env)
```
PORT=5000
NODE_ENV=production
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/taskmanager
```

### Frontend (.env)
```
REACT_APP_API_URL=https://your-api-url.onrender.com/api
```

## 🧪 Testing

Run tests for the frontend:
```bash
cd task-manager/client
npm test
```

## 📖 Documentation

- [Deployment Guide](./DEPLOYMENT.md) - Detailed deployment instructions
- [Week 7 Assignment](./Week7-Assignment.md) - Assignment requirements
- [Backend README](./task-manager/server/README.md) - Backend API documentation

## 🔗 Resources

- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [MongoDB Atlas Documentation](https://docs.atlas.mongodb.com/)
- [Render Documentation](https://render.com/docs)
- [Vercel Documentation](https://vercel.com/docs)
- [Express.js Documentation](https://expressjs.com/)
- [React Documentation](https://react.dev/)
- [Material-UI Documentation](https://mui.com/)

## 📄 License

This project is part of a learning assignment and is provided as-is for educational purposes.

## 🤝 Contributing

This is an assignment project. For questions or issues, please refer to the assignment guidelines. 