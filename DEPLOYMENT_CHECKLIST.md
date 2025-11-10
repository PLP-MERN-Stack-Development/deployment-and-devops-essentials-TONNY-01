# Deployment Checklist

Use this checklist to ensure your Task Manager application is ready for deployment.

## Pre-Deployment Checklist

### Backend (Render)
- [ ] MongoDB Atlas cluster created and configured
- [ ] MongoDB connection string obtained
- [ ] Database user created with proper permissions
- [ ] IP whitelist configured (0.0.0.0/0 for all IPs)
- [ ] Render account created
- [ ] GitHub repository connected to Render
- [ ] Environment variables configured in Render:
  - [ ] `NODE_ENV=production`
  - [ ] `MONGODB_URI` (your MongoDB Atlas connection string)
- [ ] Backend deployed and health check passing
- [ ] Backend URL noted (e.g., `https://task-manager-api.onrender.com`)

### Frontend (Vercel)
- [ ] Vercel account created
- [ ] GitHub repository connected to Vercel
- [ ] Root directory set to `task-manager/client`
- [ ] Environment variables configured in Vercel:
  - [ ] `REACT_APP_API_URL` (your Render backend URL + `/api`)
- [ ] `vercel.json` updated with correct backend URL
- [ ] Frontend deployed and accessible
- [ ] Frontend URL noted (e.g., `https://your-app.vercel.app`)

### GitHub Actions CI/CD
- [ ] GitHub repository secrets configured:
  - [ ] `VERCEL_TOKEN`
  - [ ] `VERCEL_ORG_ID`
  - [ ] `VERCEL_PROJECT_ID`
  - [ ] `REACT_APP_API_URL`
  - [ ] `RENDER_API_KEY`
  - [ ] `RENDER_SERVICE_ID`
- [ ] GitHub Actions workflows enabled
- [ ] CI workflows tested (push to branch)
- [ ] CD workflows tested (push to main/master)

## Post-Deployment Verification

### Backend Verification
- [ ] Health check endpoint working: `https://your-api.onrender.com/health`
- [ ] API endpoints accessible: `https://your-api.onrender.com/api/tasks`
- [ ] MongoDB connection working
- [ ] CORS configured correctly
- [ ] Error handling working

### Frontend Verification
- [ ] Frontend loads without errors
- [ ] Can create tasks
- [ ] Can view tasks
- [ ] Can update tasks
- [ ] Can delete tasks
- [ ] API calls successful (check browser console)
- [ ] No CORS errors

### Integration Testing
- [ ] Create task from frontend → appears in database
- [ ] Update task from frontend → changes saved in database
- [ ] Delete task from frontend → removed from database
- [ ] Refresh page → tasks persist

## Documentation Updates

- [ ] Update README.md with deployment URLs
- [ ] Update DEPLOYMENT.md with actual URLs (if needed)
- [ ] Document any custom configuration
- [ ] Add screenshots of deployed application
- [ ] Document any issues encountered and solutions

## Security Checklist

- [ ] Environment variables not committed to Git
- [ ] `.env` files in `.gitignore`
- [ ] MongoDB credentials secure
- [ ] API keys stored as secrets
- [ ] CORS configured for production domains only
- [ ] HTTPS enabled on both frontend and backend

## Monitoring Setup

- [ ] Render logs accessible
- [ ] Vercel logs accessible
- [ ] Error tracking configured (optional)
- [ ] Uptime monitoring set up (optional)
- [ ] Performance monitoring set up (optional)

## Final Steps

- [ ] Test all functionality in production
- [ ] Share deployment URLs with team/instructor
- [ ] Document deployment process
- [ ] Celebrate successful deployment! 🎉

## Troubleshooting

If you encounter issues, refer to:
1. [DEPLOYMENT.md](./DEPLOYMENT.md) - Detailed deployment guide
2. [README.md](./README.md) - Project documentation
3. Render dashboard logs
4. Vercel dashboard logs
5. Browser developer console
6. Network tab in browser dev tools

## Notes

- Render free tier services may spin down after inactivity
- First request after spin-down may be slow (cold start)
- Consider upgrading to paid tier for always-on service
- MongoDB Atlas free tier has limitations (512MB storage)
- Monitor usage to avoid exceeding free tier limits

