# Blogging Platform API 

## Tech Stack

- React + Vite: Frontend as a Single Page Application (SPA)
- Express.js + Node.js: REST API server handling request routing, middleware, and business logic.
- MySQL: The database engine to handle relational data
- Prisma ORM: Object Relational Mapper (ORM) to write type-safe SQL queries with TypeScript methods
- Github Actions: CI/CD
- Swagger UI: API Documentation
- Libraries: SPA (react-router-dom), API Calling (tan-stack-query), Auth and Hashing(jsonwebtoken, bcryptjs),, Validation (zod)

---

## Core Features

**User Authentication**: User registration and login using password hashing and JWT tokens
**Relational CRUD**: Allow logged-in users to create, read, update, and delete blog posts tied to their account
**Authorization Middleware**: Ensure users can only edit or delete their own posts, unless they are an admin
**Relational Features**: Add a nested comment system (Post -> Comments -> User) and tag filtering (e.g., `/posts?tag=tech`)
**Pagination**: Limit API results for the main post feed (e.g., `/posts?page=1&limit=10`).

