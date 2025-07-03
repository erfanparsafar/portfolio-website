# Portfolio Website

A modern portfolio website built with React (Frontend) and Django (Backend).

## 🚀 Features

- **Modern UI**: Built with React, TypeScript, and Tailwind CSS
- **Dynamic Content**: Admin panel to manage portfolio content
- **Responsive Design**: Works on all devices
- **Security**: JWT authentication and comprehensive security measures
- **Performance**: Optimized for production

## 🛠️ Tech Stack

### Frontend
- React 18
- TypeScript
- Vite
- Tailwind CSS
- Shadcn/ui Components

### Backend
- Django 5.2
- Django REST Framework
- JWT Authentication
- MySQL/PostgreSQL (Production)
- SQLite (Development)

## 📦 Installation

### Prerequisites
- Node.js 18+
- Python 3.11+
- MySQL (for production)

### Frontend Setup
```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

### Backend Setup
```bash
# Navigate to backend
cd backend

# Create virtual environment
python -m venv venv

# Activate virtual environment
# Windows:
venv\Scripts\activate
# Linux/Mac:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Copy environment variables
cp env.example .env
# Edit .env with your values

# Run migrations
python manage.py migrate

# Create superuser
python manage.py createsuperuser

# Start development server
python manage.py runserver
```

## 🔧 Configuration

### Environment Variables
Copy `backend/env.example` to `backend/.env` and configure:

```env
SECRET_KEY=your-secret-key-here
DEBUG=True
ALLOWED_HOSTS=localhost,127.0.0.1
DB_NAME=portfolio_db
DB_USER=your_db_user
DB_PASSWORD=your_password
```

### Database Setup
For development, SQLite is used by default. For production:

1. Install MySQL/PostgreSQL
2. Create database
3. Update settings.py with database credentials

## 🚀 Deployment

### Production Setup
1. Set `DEBUG=False` in environment variables
2. Configure production database
3. Run `python manage.py collectstatic`
4. Set up Nginx and SSL
5. Use Gunicorn for application server

See `DEPLOYMENT_CHECKLIST.md` for detailed instructions.

## 🔐 Security

- JWT authentication
- CORS protection
- Rate limiting
- Security headers
- SQL injection protection
- XSS protection

## 📁 Project Structure

```
├── src/                    # React frontend
│   ├── components/        # React components
│   ├── pages/            # Page components
│   └── lib/              # Utilities
├── backend/               # Django backend
│   ├── about/            # About app
│   ├── projects/         # Projects app
│   ├── skills/           # Skills app
│   └── ...
├── public/               # Static files
└── dist/                 # Build output
```

## 🧪 Testing

### Frontend
```bash
npm run test
```

### Backend
```bash
cd backend
python manage.py test
```

## 📝 API Documentation

### Authentication
- `POST /api/token/` - Get JWT token
- `POST /api/token/refresh/` - Refresh token

### Endpoints
- `GET /api/skills/` - List skills
- `GET /api/projects/` - List projects
- `GET /api/about/` - About information
- `GET /api/hero/` - Hero section
- `GET /api/contact/` - Contact information
- `GET /api/work-experience/` - Work experience
- `GET /api/writings/` - Writings/Blog posts

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support, please open an issue on GitHub.

## 🔒 Security

If you discover a security vulnerability, please email security@example.com instead of using the issue tracker.
