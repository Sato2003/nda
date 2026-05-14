# NDA Management System

A full-stack NDA management web application for creating, tracking, signing, and managing Non-Disclosure Agreements.

This project uses:
- `React + Vite` for the frontend
- `Express + MongoDB Atlas + Mongoose` for the backend
- `JWT` authentication with hashed passwords

## Features

- User registration and login
- MongoDB-backed authentication
- Employee and admin dashboard views
- Create NDAs from multiple template types
- Type-specific NDA document content
- View and print NDA documents
- NDA signing flow
- Activity log tracking
- Notification bell with read state
- Profile/settings page
- Parties directory
- Responsive layout for mobile, laptop, and desktop screens

## NDA Templates

The app supports multiple NDA types:

- Unilateral NDA
- Mutual NDA
- Multilateral NDA
- Employee NDA
- Contractor/Vendor NDA
- Investor NDA
- Customer NDA
- Standard/General NDA
- Confidentiality Agreement
- Non-Circumvention Agreement
- Non-Use NDA

Each template now has its own corresponding agreement content instead of sharing one generic NDA body.

## Tech Stack

### Frontend

- React 18
- Vite
- Axios
- jsPDF / HTML print preview

### Backend

- Node.js
- Express
- MongoDB Atlas
- Mongoose
- bcryptjs
- jsonwebtoken
- dotenv

## Project Structure

```text
nda-management-system/
|- backend/
|  |- index.js
|  `- models/
|- frontend/
|  |- src/
|  |  |- components/
|  |  |- data/
|  |  |- hooks/
|  |  |- utils/
|  |  |- api.js
|  |  `- App.jsx
|  `- vite.config.cjs
|- package.json
`- README.md
```

## Environment Variables

Create a root `.env` file with values like these:

```env
PORT=5000
MONGODB_URI=mongodb://username:password@host1:27017,host2:27017,host3:27017/nda_management_system?ssl=true&replicaSet=your-replica-set&authSource=admin&appName=nda
VITE_API_URL=http://localhost:5000
JWT_SECRET=your-long-random-secret
```

Notes:
- `JWT_SECRET` should be a long private random string.
- `MONGODB_URI` can point to MongoDB Atlas or a local MongoDB instance.
- `VITE_API_URL` should match the backend URL used by the frontend.

## Installation

Install dependencies from the project root:

```bash
npm install
```

## Running the App

Start frontend and backend together:

```bash
npm start
```

Other useful scripts:

```bash
npm run start:backend
npm run start:frontend
npm run dev
npm run build
npm run preview
```

Default local URLs:

- Frontend: `http://localhost:5173`
- Backend: `http://localhost:5000`

If port `5173` is already in use, Vite may move the frontend to another port such as `5174`.

## Authentication

The backend provides:

- `POST /auth/register`
- `POST /auth/login`
- `GET /auth/me`
- `PATCH /auth/password`
- `POST /auth/reset-password`

Passwords are hashed using `bcryptjs`, and authenticated sessions use JWT bearer tokens.

## Main API Areas

- `GET /users`
- `GET /ndas`
- `POST /ndas`
- NDA signing, revocation, deletion, and activity log routes

The frontend communicates with these routes through `frontend/src/api.js`.

## User Roles

### Employee

Employees can:

- Create new NDAs
- View their NDAs
- Sign pending NDAs
- Browse templates
- View activity logs
- Manage their settings

### Admin

Admins can:

- View all NDAs
- View all users
- Revoke NDAs
- Delete NDAs
- Monitor overall system activity

## UI Notes

- The app includes responsive dashboard behavior for mobile and desktop layouts.
- The top-right profile avatar opens settings.
- The notification bell supports read state and close-on-outside-click behavior.
- Template cards are visually enhanced and connected to real type-specific NDA content.

## Build Status

The project builds successfully with:

```bash
npm run build
```

You may still see non-blocking Vite plugin deprecation warnings during build, but they do not stop the app from compiling.

## Future Improvements

- Persist notification read state in MongoDB instead of local storage
- Add email delivery for NDA notifications
- Add richer reporting and analytics
- Add automated tests
- Add file export/download formats beyond browser print flow

## Repository

GitHub repository:

- [https://github.com/dwyt12/nda-.git](https://github.com/dwyt12/nda-.git)
