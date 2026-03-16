# EarlyCare Web Application

Professional responsive React website integrated with Django REST backend.

## 🚀 Getting Started

### 1. Prerequisites
- Node.js and npm installed.
- Django backend running.

### 2. Configure Backend IP
Open `.env` in the project root and update the backend URL:
```
REACT_APP_API_BASE_URL=http://<YOUR_BACKEND_IP>:8000
```
*(Currently set to http://10.206.165.161:8000 based on your last ipconfig)*

### 3. Install and Run
```bash
npm install
npm start
```

## 🛠 Features
- **Landing Page**: Modern healthcare-themed home.
- **Authentication**: JWT-based login and register with strict validation.
- **Dashboard**: Quick access to all health tools.
- **Symptom Checker**: AI prediction based on input symptoms.
- **Report Analysis**: File upload for medical report summarization.
- **History**: view your past health interactions.
- **Profile**: Manage your personal information.

## ⚙️ Backend Note (CORS)
I have already updated your Django `settings.py` in `c:\Users\saisr\AndroidStudioProjects\django\myproject` to include:
1. `corsheaders` in `INSTALLED_APPS`.
2. `CorsMiddleware` in `MIDDLEWARE`.
3. `CORS_ALLOW_ALL_ORIGINS = True`.

Make sure you run `pip install django-cors-headers` in your Django environment if you haven't already.
