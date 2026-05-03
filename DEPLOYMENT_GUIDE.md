# 🚀 Ubuntu Server Deployment Guide
# Music School of Delhi - Complete Setup

## 📋 Table of Contents
1. [Ubuntu Server Setup](#ubuntu-server-setup)
2. [Node.js & PM2 Installation](#nodejs--pm2-installation)
3. [Database Setup (MongoDB)](#database-setup-mongodb)
4. [Project Deployment](#project-deployment)
5. [Nginx Configuration](#nginx-configuration)
6. [SSL/HTTPS Setup](#sslhttps-setup)
7. [Domain DNS Configuration](#domain-dns-configuration)
8. [Public vs Admin Site Separation](#public-vs-admin-site-separation)
9. [PWA Installation Setup](#pwa-installation-setup)

---

## 🖥️ Ubuntu Server Setup

### 1. Update System
```bash
sudo apt update && sudo apt upgrade -y
```

### 2. Install Essential Packages
```bash
sudo apt install -y curl wget git unzip build-essential
```

### 3. Create Project User
```bash
sudo adduser musicschool
sudo usermod -aG sudo musicschool
su - musicschool
```

---

## 📦 Node.js & PM2 Installation

### 1. Install Node.js (Latest LTS)
```bash
curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash -
sudo apt-get install -y nodejs
```

### 2. Verify Installation
```bash
node --version
npm --version
```

### 3. Install PM2 Globally
```bash
sudo npm install -g pm2
```

---

## 🗄️ Database Setup (MongoDB)

### 1. Install MongoDB
```bash
wget -qO - https://www.mongodb.org/static/pgp/server-7.0.asc | sudo apt-key add -
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/7.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-7.0.list
sudo apt-get update
sudo apt-get install -y mongodb-org
```

### 2. Start & Enable MongoDB
```bash
sudo systemctl start mongod
sudo systemctl enable mongod
```

### 3. Secure MongoDB
```bash
sudo mongo
> use admin
> db.createUser({user: "admin", pwd: "YourStrongPassword", roles: ["userAdminAnyDatabase"]})
> exit
```

---

## 🚀 Project Deployment

### 1. Clone Project
```bash
cd /var/www
sudo mkdir musicschool
sudo chown musicschool:musicschool musicschool
cd musicschool
git clone <your-github-repo> .
```

### 2. Install Dependencies
```bash
# Frontend dependencies
npm install

# Backend dependencies
cd backend
npm install
cd ..
```

### 3. Environment Configuration
```bash
# Backend .env file
cd backend
nano .env
```

**.env Configuration:**
```env
NODE_ENV=production
PORT=5000
MONGODB_URI=mongodb://localhost:27017/musicschool
JWT_SECRET=your-super-secret-jwt-key-here
GMAIL_USER=shivayechouhan6@gmail.com
GMAIL_PASSWORD=nyzc wlzf lilg mxou
```

### 4. Build Frontend
```bash
cd ..
npm run build
```

---

## 🌐 Nginx Configuration

### 1. Install Nginx
```bash
sudo apt install nginx
```

### 2. Create Public Site Configuration
```bash
sudo nano /etc/nginx/sites-available/musicschool-public
```

**Public Site Config:**
```nginx
server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com;
    
    # Public website files
    root /var/www/musicschool;
    index index.html;
    
    # Handle frontend routes (SPA)
    location / {
        try_files $uri $uri/ /index.html;
    }
    
    # API proxy to backend
    location /api {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
    
    # Security headers for PWA
    add_header Service-Worker-Allowed "/";
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header Referrer-Policy "no-referrer-when-downgrade" always;
    add_header Content-Security-Policy "default-src 'self' http: https: data: blob: 'unsafe-inline'" always;
    
    # Static file caching
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
    
    # Service Worker
    location = /sw.js {
        add_header Cache-Control "no-cache, no-store, must-revalidate";
        add_header Pragma "no-cache";
        add_header Expires "0";
    }
}
```

### 3. Create Admin Site Configuration
```bash
sudo nano /etc/nginx/sites-available/musicschool-admin
```

**Admin Site Config:**
```nginx
server {
    listen 80;
    server_name admin.yourdomain.com;
    
    # Admin panel files
    root /var/www/musicschool/admin folder;
    index admin-dashboard.html;
    
    # Handle admin routes
    location / {
        try_files $uri $uri/ /admin-dashboard.html;
    }
    
    # API proxy to backend
    location /api {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
    
    # Security for admin
    add_header X-Frame-Options "DENY" always;
    add_header X-Content-Type-Options "nosniff" always;
}
```

### 4. Enable Sites
```bash
sudo ln -s /etc/nginx/sites-available/musicschool-public /etc/nginx/sites-enabled/
sudo ln -s /etc/nginx/sites-available/musicschool-admin /etc/nginx/sites-enabled/
sudo rm /etc/nginx/sites-enabled/default
sudo nginx -t
sudo systemctl restart nginx
```

---

## 🔒 SSL/HTTPS Setup

### 1. Install Certbot
```bash
sudo apt install certbot python3-certbot-nginx
```

### 2. Get SSL Certificates
```bash
# For main domain
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com

# For admin subdomain
sudo certbot --nginx -d admin.yourdomain.com
```

### 3. Auto-renewal Setup
```bash
sudo crontab -e
# Add this line:
0 12 * * * /usr/bin/certbot renew --quiet
```

---

## 🌍 Domain DNS Configuration

### 1. Go to Your Domain Provider
- GoDaddy, Namecheap, Bluehost, etc.

### 2. DNS Records Setup

**For Main Domain:**
```
Type: A Record
Name: @ (or yourdomain.com)
Value: YOUR_SERVER_IP
TTL: 3600

Type: A Record  
Name: www
Value: YOUR_SERVER_IP
TTL: 3600
```

**For Admin Subdomain:**
```
Type: A Record
Name: admin
Value: YOUR_SERVER_IP
TTL: 3600
```

### 3. Verify DNS Propagation
```bash
# Check main domain
nslookup yourdomain.com

# Check admin subdomain  
nslookup admin.yourdomain.com
```

---

## 🏢 Public vs Admin Site Separation

### 1. Public Site (yourdomain.com)
- **Visible to everyone**
- **Frontend website only**
- **Contact forms, course info**
- **No admin access**

### 2. Admin Site (admin.yourdomain.com)
- **Hidden from public**
- **Login required**
- **Full admin functionality**
- **Only you can access**

### 3. Security Measures
```bash
# Optional: Add IP restriction for admin
# Add to admin nginx config:
allow YOUR_HOME_IP;
deny all;
```

---

## 📱 PWA Installation Setup

### 1. Update manifest.json for Production
```json
{
  "name": "Music School of Delhi",
  "short_name": "MSD App",
  "description": "Learn Piano, Guitar, and Vocal classes with professional instructors.",
  "start_url": "https://yourdomain.com/",
  "display": "standalone",
  "background_color": "#ffffff",
  "theme_color": "#00bcd4",
  "orientation": "portrait-primary",
  "scope": "https://yourdomain.com/",
  "icons": [
    {
      "src": "https://yourdomain.com/images/msd-icon.svg",
      "type": "image/svg+xml",
      "sizes": "192x192"
    },
    {
      "src": "https://yourdomain.com/images/msd-icon.svg", 
      "type": "image/svg+xml",
      "sizes": "512x512"
    }
  ]
}
```

### 2. Update Service Worker for Production
```javascript
// In sw.js - Update cache URLs
const urlsToCache = [
  'https://yourdomain.com/',
  'https://yourdomain.com/index.html',
  'https://yourdomain.com/css/style.css',
  'https://yourdomain.com/js/script.js',
  'https://yourdomain.com/manifest.json'
];
```

### 3. Test PWA Installation
1. **Visit yourdomain.com** on mobile
2. **Install button appears** (bottom-right)
3. **Click "📱 Install App"**
4. **Accept install prompt**
5. **App installs on device**

---

## 🚀 PM2 Process Management

### 1. Create PM2 Configuration
```bash
cd /var/www/musicschool
nano ecosystem.config.js
```

**ecosystem.config.js:**
```javascript
module.exports = {
  apps: [{
    name: 'musicschool-api',
    script: './backend/src/server.js',
    cwd: '/var/www/musicschool',
    instances: 'max',
    exec_mode: 'cluster',
    env: {
      NODE_ENV: 'production',
      PORT: 5000
    },
    error_file: './logs/err.log',
    out_file: './logs/out.log',
    log_file: './logs/combined.log',
    time: true
  }]
};
```

### 2. Start Application
```bash
# Create logs directory
mkdir logs

# Start with PM2
pm2 start ecosystem.config.js

# Save PM2 configuration
pm2 save

# Setup PM2 startup
pm2 startup
```

---

## 🔧 Maintenance Commands

### 1. Update Application
```bash
cd /var/www/musicschool
git pull origin main
npm install
cd backend && npm install && cd ..
npm run build
pm2 restart musicschool-api
```

### 2. View Logs
```bash
pm2 logs musicschool-api
pm2 monit
```

### 3. Backup Database
```bash
mongodump --db musicschool --out /backup/$(date +%Y-%m-%d)
```

---

## ✅ Testing Checklist

### 1. Website Tests
- [ ] Public site loads at https://yourdomain.com
- [ ] Admin panel loads at https://admin.yourdomain.com
- [ ] SSL certificates working
- [ ] API endpoints responding

### 2. PWA Tests
- [ ] Install button appears on mobile
- [ ] App installs successfully
- [ ] App works in standalone mode
- [ ] Offline functionality works

### 3. Security Tests
- [ ] Admin panel requires login
- [ ] HTTPS enforced
- [ ] Security headers present
- [ ] DNS propagation complete

---

## 🎯 Final Result

### **Public Access:**
- **Website:** https://yourdomain.com
- **PWA Install:** Available to all users
- **Features:** Course info, contact, registration

### **Admin Access:**
- **Admin Panel:** https://admin.yourdomain.com  
- **Login Required:** Only authorized users
- **Features:** Full management system

### **PWA Features:**
- **Install Button:** Shows on HTTPS site
- **Offline Mode:** Cached content available
- **App Experience:** Fullscreen standalone mode

---

## 🆘 Troubleshooting

### Common Issues:
1. **Nginx 502 Bad Gateway** → Backend not running
2. **SSL Certificate Error** → DNS not propagated
3. **PWA Install Not Working** → Check HTTPS and manifest
4. **Admin Panel Not Loading** → Check nginx config

### Quick Fixes:
```bash
# Restart services
sudo systemctl restart nginx
pm2 restart musicschool-api

# Check logs
sudo tail -f /var/log/nginx/error.log
pm2 logs

# Test nginx config
sudo nginx -t
```

---

**🎉 Your Music School website is now live with PWA functionality!**
