# Blogging Application

A blogging platform built with the MERN stack where users can create, read, update, and delete blog posts. Includes authentication and filtering features.

## Features

- User registration and login with JWT authentication
- Create and manage your own blog posts
- Browse all blogs from other users
- Filter blogs by category (Travel, Tech, Finance, Career, etc.)
- Filter blogs by author
- Responsive design that works on mobile and desktop

## Tech Stack

**Backend:**
- Node.js & Express
- MongoDB Atlas with Prisma ORM
- JWT for authentication
- bcryptjs for password hashing
- Zod for input validation

**Frontend:**
- React with TypeScript
- Vite for fast builds
- Tailwind CSS for styling
- React Router for navigation

## Getting Started

### Prerequisites
- Node.js 18 or higher
- MongoDB Atlas account
- Git

### Installation

1. Clone the repository
```bash
git clone https://github.com/Chari143/blogging-application.git
cd blogging-application
```

2. Set up the backend
```bash
cd backend
npm install

# Create a .env file with your MongoDB connection
cp .env.example .env
# Edit .env and add your MongoDB URL and JWT secret

# Set up the database
npx prisma generate
npx prisma db push

# Start the backend server
npm run dev
```

The backend will run on `http://localhost:3003`

3. Set up the frontend
```bash
cd ../frontend
npm install

# Start the frontend
npm run dev
```

The frontend will run on `http://localhost:3004`

## Project Structure

```
blogging-application/
├── backend/          # Express API with Prisma
│   ├── src/
│   │   ├── controllers/    # Business logic
│   │   ├── routes/         # API routes
│   │   ├── middleware/     # Auth middleware
│   │   └── schemas/        # Validation schemas
│   └── prisma/
│       └── schema.prisma   # Database schema
│
└── frontend/         # React app
    └── src/
        ├── components/     # Reusable components
        ├── pages/          # Page components
        ├── context/        # Auth context
        └── types/          # TypeScript types
```

## API Endpoints

**Authentication:**
- `POST /auth/signup` - Create a new account
- `POST /auth/login` - Login and get a token

**Blogs (all require authentication):**
- `GET /blogs` - Get all blogs
- `GET /blogs?category=Travel` - Filter by category
- `GET /blogs?author=John` - Filter by author
- `POST /blogs` - Create a new blog
- `PUT /blogs/:id` - Update your blog
- `DELETE /blogs/:id` - Delete your blog

## Database Models

**User**
- Name, email (unique), encrypted password
- Created timestamp

**Blog**
- Title, category, author, content
- Optional image URL
- References the user who created it
- Created and updated timestamps

## Deployment

See [DEPLOYMENT.md](DEPLOYMENT.md) for instructions on deploying to a VPS with DuckDNS and Nginx.

## Environment Variables

**Backend (.env):**
```
PORT=3003
DATABASE_URL=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

**Frontend (.env):**
```
VITE_API_URL=http://localhost:3003
```

## Features in Detail

- **Secure Authentication**: Passwords are hashed with bcrypt, JWT tokens expire after 7 days
- **Authorization**: Users can only edit or delete their own blogs
- **Input Validation**: All inputs are validated on both frontend and backend
- **Responsive Design**: Works well on phones, tablets, and desktops
- **Error Handling**: Clear error messages when something goes wrong

## License

This project was created for educational purposes.
