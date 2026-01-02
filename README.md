# FootIQ Backend

Virtual coach trainer for U12 rising football stars. This backend API provides authentication, drill management, and training resources for young football players.

## Features

- User authentication with JWT tokens
- Drill management system
- PostgreSQL database integration
- RESTful API design
- CORS enabled for frontend integration

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: PostgreSQL
- **Authentication**: JWT (JSON Web Tokens)
- **Password Hashing**: bcryptjs
- **Testing**: Jest + Supertest

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Nigellkip/footiq-backend.git
   cd footiq-backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file in the root directory with the following variables:
   ```env
   PORT=5000
   DATABASE_URL=postgresql://username:password@localhost:5432/footiq_db
   JWT_SECRET=your_super_secret_jwt_key_here
   ```

4. Set up the database:
   - Create a PostgreSQL database named `footiq_db`
   - Run the seed script to populate initial data:
     ```bash
     node src/config/seed.js
     ```

## Running the Application

### Development
```bash
npm run dev
```

### Production
```bash
npm start
```

The server will start on `http://localhost:5000` (or the port specified in `.env`).

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/profile` - Get user profile (requires authentication)

### Drills
- `GET /api/drills` - Get all drills
- `GET /api/drills/:slug` - Get drill by slug

### Health Check
- `GET /health` - API health status
- `GET /` - Welcome message

## Testing

Run tests with:
```bash
npm test
```

## Project Structure

```
footiq-backend/
├── src/
│   ├── app.js                 # Main Express app
│   ├── config/
│   │   ├── database.js        # Database connection
│   │   └── seed.js           # Database seeding
│   ├── controllers/
│   │   ├── auth.controller.js # Authentication logic
│   │   └── drill.controller.js # Drill management
│   ├── middleware/
│   │   ├── auth.js           # JWT authentication middleware
│   │   └── validation.js     # Input validation
│   ├── models/
│   │   ├── User.js           # User model
│   │   └── Drill.js          # Drill model
│   ├── routes/
│   │   ├── auth.routes.js    # Auth routes
│   │   └── drill.routes.js   # Drill routes
│   └── utils/
│       └── jwt.js            # JWT utilities
├── server.js                  # Server entry point
├── package.json
├── README.md
└── .env                       # Environment variables (not committed)
```

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit your changes: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feature-name`
5. Open a pull request

## License

This project is licensed under the ISC License.

## Contact

For questions or support, please open an issue on GitHub.
