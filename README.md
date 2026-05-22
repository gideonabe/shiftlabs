# Shift Labs - Student Gig Economy Platform

A modern, full-stack platform connecting students with flexible gig opportunities. Built with Next.js 16 (frontend) and FastAPI (backend).

![Project Screenshot](./assets/shiftlabs.png)


## Project Structure

```
shift/
├── shift-frontend/          # Next.js frontend application
│   ├── app/
│   │   ├── layout.tsx       # Root layout
│   │   ├── page.tsx         # Landing page
│   │   ├── globals.css      # Global styles & design tokens
│   │   └── [routes]/        # Page routes
│   ├── components/          # Reusable UI components
│   ├── lib/
│   │   ├── store/           # Zustand state management
│   │   ├── api/             # API client
│   │   └── utils/           # Utilities
│   ├── public/              # Static assets
│   ├── next.config.mjs      # Next.js configuration
│   └── package.json
├── shift-backend/           # FastAPI backend
│   ├── app/
│   │   ├── api/             # API route handlers
│   │   ├── models.py        # Database models
│   │   ├── schemas.py       # Pydantic schemas
│   │   ├── security.py      # Auth & security
│   │   └── config.py        # Configuration
│   ├── main.py              # FastAPI app entry
│   └── requirements.txt
└── README.md
```

## Design System

### Color Palette
- **Primary**: Electric Green (#22C55E)
- **Accent**: Neon Orange (#FF6B35)
- **Background**: White (#FFFFFF)
- **Neutrals**: Gray scale (50-900)

### Typography
- **Display**: Inter (700-900 weights)
- **Body**: Inter (300-600 weights)

### Components
- Premium rounded corners (8-32px)
- Smooth shadows & glass effects
- Mobile-first responsive design
- Dark/Light mode ready

## Frontend Setup

### Prerequisites
- Node.js 18+
- npm or pnpm

### Installation

```bash
cd frontend
npm install
# or
pnpm install
```

### Development

```bash
npm run dev
```

The app will open at `http://localhost:3000`

### Build

```bash
npm run build
npm run start
```

## Backend Setup

### Prerequisites
- Python 3.9+
- PostgreSQL (or SQLite for development)
- pip/virtualenv

### Installation

```bash
cd backend

# Create virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Copy environment file
cp .env.example .env
```

### Configure Environment

Edit `.env` with your settings:

```env
DATABASE_URL=postgresql://user:password@localhost:5432/shift_db
SECRET_KEY=your-secret-key
ALLOWED_ORIGINS=http://localhost:5173,http://localhost:3000
```

### Run Development Server

```bash
python main.py
```

API will be available at `http://localhost:8000`

View API docs at `http://localhost:8000/docs`

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/verify-email` - Verify email
- `POST /api/auth/resend-verification` - Resend verification

### Gigs
- `GET /api/gigs` - Get all gigs
- `GET /api/gigs/{id}` - Get gig details
- `POST /api/gigs` - Create new gig (employer only)
- `PUT /api/gigs/{id}` - Update gig
- `DELETE /api/gigs/{id}` - Delete gig
- `POST /api/gigs/{id}/apply` - Apply to gig

### Users
- `GET /api/users/profile` - Get current user profile
- `PUT /api/users/profile` - Update profile
- `GET /api/users/{id}` - Get user by ID

### Wallet
- `GET /api/wallet` - Get wallet details
- `POST /api/wallet/add-funds` - Add funds
- `POST /api/wallet/withdraw` - Withdraw funds
- `GET /api/wallet/transactions` - Get transaction history

### Chat
- `GET /api/chat/conversations` - Get conversations
- `POST /api/chat/conversations` - Create conversation
- `GET /api/chat/conversations/{id}/messages` - Get messages
- `POST /api/chat/conversations/{id}/messages` - Send message

### Admin
- `GET /api/admin/analytics` - Get platform analytics
- `GET /api/admin/users` - List users
- `POST /api/admin/users/{id}/ban` - Ban user
- `DELETE /api/admin/gigs/{id}` - Remove gig

## Features

### MVP (Current)
- ✅ User authentication (register/login)
- ✅ Gig marketplace (browse, post, apply)
- ✅ User profiles & ratings
- ✅ Real-time chat
- ✅ Wallet & transactions
- ✅ Admin dashboard
- ✅ Splash screen
- ✅ Responsive design

### Roadmap
- WebSocket real-time chat
- Email notifications
- Stripe payment integration
- Location-based gig discovery
- Advanced search & filters
- Video verification
- Dispute resolution system
- Mobile app (React Native)

## Technology Stack

### Frontend
- Next.js 16 (App Router)
- React 18
- TypeScript
- Tailwind CSS v4
- Framer Motion (animations)
- Zustand (state management)
- Axios (HTTP client)
- SWR (data fetching)

### Backend
- FastAPI
- SQLAlchemy (ORM)
- Pydantic (validation)
- JWT (authentication)
- Bcrypt (password hashing)
- PostgreSQL (primary) / SQLite (dev)

## Deployment

### Frontend
Deploy to Vercel:
```bash
vercel
```

### Backend
Deploy to Railway, Render, or Heroku:
```bash
# Example: Render
git push origin main
```

## Environment Variables

### Frontend (.env.local)
```
NEXT_PUBLIC_API_URL=http://localhost:8000
NEXT_PUBLIC_APP_NAME=Shift
```

### Backend (.env)
```
DATABASE_URL=postgresql://...
SECRET_KEY=your-secret
STRIPE_SECRET_KEY=sk_test_...
```

## Security

- Passwords hashed with bcrypt
- JWT tokens for authentication
- CORS enabled
- SQL injection protection via SQLAlchemy
- Environment variables for secrets

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

MIT License - see LICENSE file for details

## Support

For issues and questions:
- GitHub Issues: [Create an issue](https://github.com/yourusername/shift/issues)
- Email: support@shift.app

## Acknowledgments

- Built with ❤️ for students everywhere
- Inspired by Uber, Airbnb, and LinkedIn
