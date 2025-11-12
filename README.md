# Full Stack Application

A modern web application built with React frontend and Django backend.

# 🚀 Tech Stack

**Frontend:** React 18 • Vite • Material-UI • Redux Toolkit • React Router • Axios

**Backend:** Django • Django REST Framework • SQLite • JWT Authentication

# 📦 Quick Start

### Frontend Setup
```bash
cd frontend
npm install
npm run dev
```
## Stock Sync 

A full-stack web application built with React frontend and Django backend.

# 🛠 Tech Stack
### Frontend
React 18 - UI framework

Vite - Build tool and dev server

Material-UI (MUI) - Component library with Emotion for styling

Redux Toolkit - State management

React Router DOM - Client-side routing

Axios - HTTP client

JWT Decode - JWT token handling

React Virtualized - Efficient rendering for large lists

### Backend
Django - Web framework

Django REST Framework - API construction

Django CORS Headers - Cross-origin resource sharing

Simple JWT - JSON Web Token authentication

PostgreSQL - Database (via psycopg2)

Python-dotenv - Environment variable management

Sentry SDK - Error monitoring

### Testing & Development
Jest - Testing framework

Testing Library - React component testing

ESLint - Code linting

Babel - JavaScript transpilation

# 📁 Project Structure
```text
project/
├── frontend/          # React application
│   ├── package.json
│   └── ...
├── backend/           # Django application
│   ├── requirements.txt
│   └── ...
└── README.md
```
## 🚀 Getting Started
# Prerequisites
Node.js (version 18 or higher recommended)

Python 3.8+

sqlite or PostgreSQL 

# Frontend Setup
Navigate to the frontend directory:
```bash
cd frontend
```
Install dependencies:
```bash
npm install
```
Start development server:
```bash
npm run dev
```
The frontend will be available at http://localhost:5173 (default Vite port).

# Backend Setup
Navigate to the backend directory:
```bash
cd backend
```
Create a virtual environment:
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
````

Install dependencies:
```bash
pip install -r requirements.txt
```
# Set up environment variables:
Create a .env file with your database configuration and secret key.

Run migrations:
```bash
python manage.py migrate
```

Start development server:
```bash
python manage.py runserver
```
The backend API will be available at http://localhost:8000.

# 📜 Available Scripts
# Frontend Scripts
npm run dev - Start development server

npm run build - Build for production

npm run preview - Preview production build

npm run lint - Run ESLint

npm run test - Run tests once

npm run test:watch - Run tests in watch mode

npm run test:coverage - Run tests with coverage report

# Backend Commands
python manage.py runserver - Start development server

python manage.py makemigrations - Create new migrations

python manage.py migrate - Apply migrations

python manage.py createsuperuser - Create admin user

# 🧪 Testing
# Frontend Testing
```bash
npm test              # Run tests once
npm run test:watch    # Run tests in watch mode
npm run test:coverage # Generate coverage report
```
# Backend Testing
```bash
python manage.py test
```

# 🔧 Configuration
# Environment Variables
Frontend (typically in .env file):

env
VITE_API_BASE_URL=http://localhost:8000/api

# Backend (in .env file):

env
SECRET_KEY=your-secret-key
DEBUG=True
DATABASE_URL=postgres://user:password@localhost:5432/dbname

# 📦 Deployment
# Frontend Build
```bash
npm run build
```
The built files will be in the dist directory, ready for deployment to any static hosting service.

# Backend Deployment
The Django backend can be deployed to various platforms including:

Heroku

AWS Elastic Beanstalk

DigitalOcean App Platform

PythonAnywhere

# 🤝 Contributing
Fork the repository

Create a feature branch

Commit your changes

Push to the branch

Create a Pull Request
