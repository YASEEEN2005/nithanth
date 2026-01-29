# Quick Start Guide

This project consists of a **Django Backend** and a **React Frontend**.

## Prerequisites
-   Node.js & npm (or pnpm)
-   Python & Django

## 1. Run the React Frontend
The frontend has been converted to a Vite application located in the `templates` directory.

1.  Navigate to the frontend directory:
    ```bash
    cd backend/templates
    ```
2.  Install dependencies (if not done):
    ```bash
    npm install
    ```
3.  Start the development server:
    ```bash
    npm run dev
    ```
    The app will typically run at `http://localhost:5173`.

## 2. Run the Django Backend
1.  Navigate to the backend directory:
    ```bash
    cd backend
    ```
2.  Start the server:
    ```bash
    python manage.py runserver
    ```
    Server runs at `http://127.0.0.1:8000`.

## ⚠️ Important Integration Note
Since the original HTML templates were deleted (per requirements) and replaced with this React app:
-   **Frontend**: Use `http://localhost:5173` to browse the UI.
-   **Backend**: The Django views still attempt to render templates like `login.html`.
    -   **Action Required**: You must update your Django `views.py` or `urls.py` to serve the React `index.html` (or `dist/index.html` after building) for these routes, OR use a library like `django-spa` or `whitenoise` to serve the frontend.
    -   Until this backend update is made, direct requests to Django URLs (e.g., `localhost:8000/community/`) returns a `TemplateDoesNotExist` error.
