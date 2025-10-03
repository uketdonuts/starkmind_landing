# Changelog

All notable changes to the StarkMind Landing Page project.

## [2.0.0] - 2025-06-11

### 🚀 Major Upgrade: React + TypeScript Integration

#### Added
- **React 18** with TypeScript support
- **Tailwind CSS** with custom configuration and PostCSS
- **Multi-stage Docker build** (React build → Flask serve)
- **Development helper script** (`dev.sh`) with common commands
- **Separate development environment** with hot reload
- **CORS support** for development API calls
- **SPA routing** support with React Router compatibility
- **TypeScript configuration** with strict settings

#### Changed
- **Architecture**: Flask now serves as API backend + React static files
- **API Routes**: Moved to `/api/` prefix (`/api/send-email`, `/api/health`)
- **Docker Setup**: Production uses React build, development runs separate servers
- **Development Workflow**: React dev server (3000) + Flask API (5001)
- **Project Structure**: Added `src/`, `public/`, React-specific configs

#### Technical Details
- **Frontend**: React 18 + TypeScript + Tailwind CSS
- **Backend**: Flask + Flask-CORS + Flask-Mail
- **Build**: Multi-stage Dockerfile with Node.js → Python
- **Development**: Separate containers with volume mounting
- **Production**: Nginx → Flask → React static files

#### Migration Guide
```bash
# Old workflow
docker-compose up --build

# New workflows
./dev.sh dev   # Development (React + Flask separate)
./dev.sh prod  # Production (React build + Flask + Nginx)
```

#### Backward Compatibility
- Legacy `/send-email` route still supported
- Flask templates available as fallback
- All existing environment variables remain the same

---

## [1.0.0] - 2024-12-XX

### Initial Release

#### Added
- **Flask backend** with Zoho SMTP integration
- **Professional landing page** design
- **Contact form** with email functionality
- **Docker deployment** with Nginx reverse proxy
- **Responsive design** with Tailwind CSS
- **SEO optimization** with proper meta tags
- **Security features** (rate limiting, input validation)

#### Features
- Modern landing page layout
- Contact form with backend validation
- Email sending via Zoho SMTP
- Docker containerization
- Nginx reverse proxy
- Health check endpoints
- Logging and monitoring

#### Tech Stack
- Flask (Python)
- HTML5 + Tailwind CSS + Alpine.js
- Docker + Docker Compose
- Nginx
- Gunicorn WSGI server