# NextAuth Authentication - Test Guide

## ✅ Setup Complete!

Your authentication system is now fully configured with:

- NextAuth.js for session management
- Email verification with 6-digit codes
- MongoDB integration
- Protected routes

## 🧪 Testing the System

### 1. **Register a New User**

Visit: `http://localhost:3000/register`

Or use curl:

```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "your-email@gmail.com",
    "password": "password123"
  }'
```

📧 Check your email for the 6-digit verification code!

### 2. **Verify Email**

Visit: `http://localhost:3000/verify?email=your-email@gmail.com`

Or use curl:

```bash
curl -X POST http://localhost:3000/api/auth/verify-email \
  -H "Content-Type: application/json" \
  -d '{
    "email": "your-email@gmail.com",
    "code": "123456"
  }'
```

### 3. **Login**

Visit: `http://localhost:3000/login`

Or use NextAuth API:

```bash
curl -X POST http://localhost:3000/api/auth/callback/credentials \
  -H "Content-Type: application/json" \
  -d '{
    "email": "your-email@gmail.com",
    "password": "password123"
  }'
```

### 4. **Check Session**

In your React components:

```jsx
import { useSession } from "next-auth/react";

function MyComponent() {
  const { data: session, status } = useSession();

  if (status === "loading") return <div>Loading...</div>;
  if (status === "unauthenticated") return <div>Please login</div>;

  return <div>Hello {session.user.name}!</div>;
}
```

### 5. **Resend Verification Code**

```bash
curl -X POST http://localhost:3000/api/auth/resend-code \
  -H "Content-Type: application/json" \
  -d '{"email": "your-email@gmail.com"}'
```

## 📁 Files Created/Updated

### New Files:

- `/app/api/auth/[...nextauth]/route.js` - NextAuth configuration
- `/lib/auth.js` - Auth helper functions
- `/components/AuthProvider.jsx` - Session provider wrapper

### Updated Files:

- `/app/layout.tsx` - Added AuthProvider
- `/app/login/page.jsx` - Integrated NextAuth signIn
- `/app/register/page.jsx` - Added form validation
- `/app/verify/page.jsx` - Added verification logic
- `/components/Navbar.jsx` - Added session-based UI
- `/.env.local` - Added NextAuth secrets

## 🔐 Environment Variables

Make sure these are set in `.env.local`:

```env
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-super-secret-key-change-this-in-production
EMAIL_SERVER_USER=lav.vimean168@gmail.com
EMAIL_SERVER_PASSWORD=uvlr qlvy yvaz jiuj
```

## 🚀 API Endpoints

| Endpoint                  | Method   | Description              |
| ------------------------- | -------- | ------------------------ |
| `/api/auth/register`      | POST     | Register new user        |
| `/api/auth/verify-email`  | POST     | Verify email with code   |
| `/api/auth/resend-code`   | POST     | Resend verification code |
| `/api/auth/[...nextauth]` | GET/POST | NextAuth handlers        |

## 🎯 Features

✅ User Registration with email  
✅ Email verification (6-digit code, 10min expiry)  
✅ Secure login with NextAuth  
✅ Session management  
✅ Protected routes  
✅ Automatic session on client/server  
✅ Logout functionality  
✅ User profile in session

## 📝 Next Steps

1. Test registration flow
2. Check email for verification code
3. Complete verification
4. Try logging in
5. See your name in the navbar!

Enjoy your secure authentication system! 🎉
