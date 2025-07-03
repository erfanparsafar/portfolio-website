# Deployment Checklist

## 🔐 Security Setup

### 1. Environment Variables
```bash
# Create .env file on production server
SECRET_KEY=your-generated-secret-key
DEBUG=False
ALLOWED_HOSTS=yourdomain.com,www.yourdomain.com
DB_NAME=portfolio_db
DB_USER=your_db_user
DB_PASSWORD=your_secure_password
DB_HOST=localhost
DB_PORT=3306
```

### 2. Generate Secure Secret Key
```bash
cd backend
python generate_secret_key.py
```

## 🗄️ Database Setup

### 1. Install MySQL
```bash
# Ubuntu/Debian
sudo apt update
sudo apt install mysql-server

# CentOS/RHEL
sudo yum install mysql-server
```

### 2. Create Database
```sql
CREATE DATABASE portfolio_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE USER 'portfolio_user'@'localhost' IDENTIFIED BY 'your_secure_password';
GRANT ALL PRIVILEGES ON portfolio_db.* TO 'portfolio_user'@'localhost';
FLUSH PRIVILEGES;
```

### 3. Run Migrations
```bash
cd backend
python manage.py migrate
```

## 🚀 Backend Setup

### 1. Install Dependencies
```bash
cd backend
pip install -r requirements.txt
```

### 2. Collect Static Files
```bash
python manage.py collectstatic --noinput
```

### 3. Create Superuser
```bash
python manage.py createsuperuser
```

### 4. Test Backend
```bash
python manage.py runserver 0.0.0.0:8000
```

## 🌐 Web Server Setup

### 1. Install Nginx
```bash
# Ubuntu/Debian
sudo apt install nginx

# CentOS/RHEL
sudo yum install nginx
```

### 2. Configure Nginx
```bash
# Copy nginx.conf to /etc/nginx/sites-available/portfolio
sudo cp backend/nginx.conf /etc/nginx/sites-available/portfolio

# Edit the file with your domain
sudo nano /etc/nginx/sites-available/portfolio

# Enable the site
sudo ln -s /etc/nginx/sites-available/portfolio /etc/nginx/sites-enabled/

# Test configuration
sudo nginx -t

# Restart Nginx
sudo systemctl restart nginx
```

## 🔧 Application Server Setup

### 1. Install Gunicorn
```bash
pip install gunicorn
```

### 2. Test Gunicorn
```bash
cd backend
gunicorn --config gunicorn.conf.py backend.wsgi:application
```

### 3. Setup Systemd Service
```bash
# Copy service file
sudo cp backend/portfolio.service /etc/systemd/system/

# Edit with correct paths
sudo nano /etc/systemd/system/portfolio.service

# Enable and start service
sudo systemctl daemon-reload
sudo systemctl enable portfolio
sudo systemctl start portfolio
```

## 🔒 SSL Certificate

### 1. Install Certbot
```bash
# Ubuntu/Debian
sudo apt install certbot python3-certbot-nginx

# CentOS/RHEL
sudo yum install certbot python3-certbot-nginx
```

### 2. Get SSL Certificate
```bash
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com
```

## 📊 Monitoring & Logs

### 1. Check Application Status
```bash
sudo systemctl status portfolio
sudo systemctl status nginx
```

### 2. View Logs
```bash
# Application logs
sudo journalctl -u portfolio -f

# Nginx logs
sudo tail -f /var/log/nginx/access.log
sudo tail -f /var/log/nginx/error.log
```

## 🔍 Security Verification

### 1. Run Security Check
```bash
cd backend
python security_check.py
```

### 2. Test HTTPS
```bash
curl -I https://yourdomain.com
```

### 3. Check Security Headers
```bash
curl -I -H "Host: yourdomain.com" https://yourdomain.com
```

## 📋 Final Checklist

- [ ] Environment variables set
- [ ] Database created and migrated
- [ ] Static files collected
- [ ] Superuser created
- [ ] Nginx configured and running
- [ ] Gunicorn service running
- [ ] SSL certificate installed
- [ ] Security check passed
- [ ] Frontend build deployed
- [ ] All URLs working (frontend, API, admin)
- [ ] Backup system configured
- [ ] Monitoring setup

## 🚨 Important Notes

1. **Never commit .env files to version control**
2. **Use strong passwords for database and admin**
3. **Regular backups of database and files**
4. **Keep packages updated**
5. **Monitor logs for errors**
6. **Set up firewall rules**
7. **Configure automatic SSL renewal**

## 🆘 Troubleshooting

### Common Issues:
1. **Permission denied**: Check file permissions
2. **Database connection failed**: Verify MySQL credentials
3. **Static files not found**: Run collectstatic again
4. **SSL errors**: Check certificate paths in nginx.conf
5. **Service won't start**: Check logs with `journalctl -u portfolio` 