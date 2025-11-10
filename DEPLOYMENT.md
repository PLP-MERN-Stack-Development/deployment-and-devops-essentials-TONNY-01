# Deployment Guide

This guide will walk you through deploying the Task Manager application to Render (backend) and Vercel (frontend).

## Prerequisites

1. **GitHub Account** - For repository hosting and CI/CD
2. **Render Account** - For backend hosting (free tier available)
3. **Vercel Account** - For frontend hosting (free tier available)
4. **MongoDB Atlas Account** - For database hosting (free tier available)
5. **Node.js** - Version 18.x or higher

## Step 1: Set Up MongoDB Atlas

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free cluster
3. Create a database user with read/write permissions
4. Whitelist your IP address (or use `0.0.0.0/0` for all IPs in development)
5. Get your connection string: `mongodb+srv://username:password@cluster.mongodb.net/taskmanager`

## Step 2: Deploy Backend to Render

### Option A: Using Render Dashboard

1. Go to [Render Dashboard](https://dashboard.render.com/)
2. Click "New +" and select "Web Service"
3. Connect your GitHub repository
4. Configure the service:
   - **Name**: `task-manager-api`
   - **Environment**: `Node`
   - **Build Command**: `cd task-manager/server && npm install`
   - **Start Command**: `cd task-manager/server && npm start`
   - **Root Directory**: Leave empty (or set to `task-manager/server`)
5. Add Environment Variables:
   - `NODE_ENV` = `production`
   - `MONGODB_URI` = Your MongoDB Atlas connection string
   - `PORT` = (Render will set this automatically)
6. Click "Create Web Service"
7. Wait for deployment to complete
8. Note your backend URL (e.g., `https://task-manager-api.onrender.com`)

### Option B: Using render.yaml

1. The `render.yaml` file is already configured in the root directory
2. In Render Dashboard, go to "New +" → "Blueprint"
3. Connect your GitHub repository
4. Render will automatically detect and use the `render.yaml` file
5. Update the `MONGODB_URI` environment variable in the Render dashboard

### Health Check

Your backend should be accessible at:
- Health endpoint: `https://your-api-url.onrender.com/health`
- API endpoint: `https://your-api-url.onrender.com/api/tasks`

## Step 3: Deploy Frontend to Vercel

### Option A: Using Vercel Dashboard

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click "Add New Project"
3. Import your GitHub repository
4. Configure the project:
   - **Framework Preset**: Create React App
   - **Root Directory**: `task-manager/client`
   - **Build Command**: `npm run build`
   - **Output Directory**: `build`
5. Add Environment Variables:
   - `REACT_APP_API_URL` = `https://your-api-url.onrender.com/api`
6. Click "Deploy"
7. Wait for deployment to complete
8. Note your frontend URL (e.g., `https://your-app.vercel.app`)

### Option B: Using Vercel CLI

1. Install Vercel CLI:
   ```bash
   npm i -g vercel
   ```

2. Navigate to the client directory:
   ```bash
   cd task-manager/client
   ```

3. Login to Vercel:
   ```bash
   vercel login
   ```

4. Deploy:
   ```bash
   vercel
   ```

5. Set environment variables:
   ```bash
   vercel env add REACT_APP_API_URL
   # Enter: https://your-api-url.onrender.com/api
   ```

### Update Vercel Configuration

Update `task-manager/client/vercel.json` with your actual backend URL:
```json
{
  "rewrites": [
    {
      "source": "/api/(.*)",
      "destination": "https://your-api-url.onrender.com/api/$1"
    },
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

## Step 4: Set Up CI/CD with GitHub Actions

### GitHub Secrets Configuration

Add the following secrets to your GitHub repository (Settings → Secrets and variables → Actions):

#### For Frontend (Vercel):
- `VERCEL_TOKEN` - Get from [Vercel Settings](https://vercel.com/account/tokens)
- `VERCEL_ORG_ID` - Get from Vercel dashboard
- `VERCEL_PROJECT_ID` - Get from Vercel project settings
- `REACT_APP_API_URL` - Your backend API URL

#### For Backend (Render):
- `RENDER_API_KEY` - Get from [Render Dashboard](https://dashboard.render.com/account/api-keys)
- `RENDER_SERVICE_ID` - Get from your Render service settings

### Workflow Files

The following GitHub Actions workflows are already configured:

1. **Frontend CI** (`.github/workflows/frontend-ci.yml`)
   - Runs on push/PR to main/master/develop
   - Tests and builds the React app

2. **Backend CI** (`.github/workflows/backend-ci.yml`)
   - Runs on push/PR to main/master/develop
   - Tests the Express server

3. **Frontend CD** (`.github/workflows/frontend-cd.yml`)
   - Deploys to Vercel on push to main/master

4. **Backend CD** (`.github/workflows/backend-cd.yml`)
   - Deploys to Render on push to main/master

## Step 5: Update API Configuration

After deploying the backend, update the frontend to use the correct API URL:

1. In Vercel Dashboard, go to your project settings
2. Navigate to "Environment Variables"
3. Update `REACT_APP_API_URL` to your Render backend URL
4. Redeploy the frontend

Or update `task-manager/client/src/services/api.js`:
```javascript
const API_URL = process.env.REACT_APP_API_URL || 'https://your-api-url.onrender.com/api';
```

## Step 6: Verify Deployment

1. **Backend Health Check**:
   ```bash
   curl https://your-api-url.onrender.com/health
   ```
   Should return: `{"status":"OK","message":"Server is running",...}`

2. **Frontend**:
   - Visit your Vercel URL
   - Try creating a task
   - Verify tasks are saved and retrieved from the database

## Troubleshooting

### Backend Issues

1. **Connection to MongoDB fails**:
   - Verify MongoDB Atlas IP whitelist includes `0.0.0.0/0`
   - Check connection string format
   - Verify database user has correct permissions

2. **Server crashes on Render**:
   - Check Render logs for errors
   - Verify all environment variables are set
   - Ensure `package.json` has correct start script

### Frontend Issues

1. **API calls fail**:
   - Verify `REACT_APP_API_URL` is set correctly
   - Check browser console for CORS errors
   - Verify backend is running and accessible

2. **Build fails on Vercel**:
   - Check build logs in Vercel dashboard
   - Verify all dependencies are in `package.json`
   - Ensure Node.js version is compatible

### CORS Issues

If you encounter CORS errors, the backend already has CORS enabled. If issues persist:

1. Update `task-manager/server/server.js` to specify allowed origins
2. Add your Vercel domain to the CORS configuration

## Monitoring

### Render Monitoring

- View logs in Render dashboard
- Set up alerts for service downtime
- Monitor resource usage

### Vercel Monitoring

- View deployment logs in Vercel dashboard
- Monitor analytics and performance
- Set up error tracking (optional)

## Maintenance

1. **Regular Updates**:
   - Keep dependencies up to date
   - Monitor security advisories
   - Update Node.js version as needed

2. **Database Backups**:
   - MongoDB Atlas provides automatic backups on paid plans
   - For free tier, consider manual backups

3. **Environment Variables**:
   - Keep environment variables secure
   - Never commit `.env` files to Git
   - Rotate API keys regularly

## Support

For issues or questions:
- Check Render documentation: https://render.com/docs
- Check Vercel documentation: https://vercel.com/docs
- Check MongoDB Atlas documentation: https://docs.atlas.mongodb.com/
