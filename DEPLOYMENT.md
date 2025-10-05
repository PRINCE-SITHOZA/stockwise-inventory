# SA Warehouse Enterprise - Deployment Guide

## ?? Quick Start

### Prerequisites
- Node.js 18+ 
- npm 8+
- Modern web browser

### Development
1. Clone repository
2. Run `npm install`
3. Run `npm run dev`
4. Open http://localhost:3000

### Production Build
1. Run `npm run build:production`
2. Deploy `dist/` folder to your web server

## ?? Deployment Options

### Option 1: Static Hosting (Netlify/Vercel)
1. Connect your repository
2. Set build command: `npm run build`
3. Set publish directory: `dist`
4. Deploy!

### Option 2: Docker Container
1. Build image: `docker build -t sa-warehouse .`
2. Run container: `docker run -p 80:80 sa-warehouse`

### Option 3: Traditional Web Server
1. Run `npm run build:production`
2. Upload `dist/` contents to your web server
3. Configure redirects for React Router

## ?? Environment Variables

Required:
- `REACT_APP_API_URL`: Backend API URL
- `REACT_APP_SENTRY_DSN`: Error tracking (optional)

## ?? Monitoring Setup

1. **Sentry**: Error tracking and performance monitoring
2. **Google Analytics**: User behavior analytics
3. **Uptime Robot**: Availability monitoring

## ?? Security Checklist

- [ ] Enable HTTPS
- [ ] Configure CSP headers
- [ ] Set up proper CORS
- [ ] Regular dependency updates
- [ ] Security headers configured

## ?? Support

For deployment assistance, contact:
- Email: support@sa-warehouse.co.za
- Phone: +27 11 123 4567
