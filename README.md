# Expense Tracker

 This is a MEAN stack project which is used for tracking huge expenses and visualizing those expenses, some of its highlighting features includes Categorization of expense data, Visualization of expense data in form of bar graph & pie chart using Chart.js and if you want to keep track of a huge amount of data then it can be easily done through the .csv file import option.

## Project Overview
This is a MEAN stack expense tracking application with the following structure:
- **Frontend**: Angular application with Material UI components
- **Backend**: Node.js/Express.js REST API
- **Database**: MongoDB
- **Features**: Expense CRUD operations, data visualization with Chart.js, CSV import, user authentication

![expense](https://github.com/user-attachments/assets/45a62bfb-ae26-4e11-b481-ff14c62ddf42)

# Development Setup Guide

## Prerequisites
Before setting up the project locally, ensure you have the following installed:
- Node.js (v14 or higher)
- npm or yarn package manager
- MongoDB (local installation or MongoDB Atlas account)
- Git

## Backend Setup

### 1. Navigate to Backend Directory
```bash
cd backend
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Configuration
Create a `.env` file in the backend directory with the following variables:
```env
MONGO_URI=mongodb://localhost:27017/expense_tracker
# OR for MongoDB Atlas:
# MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/expense_tracker

PORT=3000
JWT_SECRET=your_jwt_secret_key_here
```

### 4. Start Backend Server
```bash
# Development mode
npm start

# OR with nodemon for auto-restart
npm install -g nodemon
nodemon app.js
```

The backend server will run on `http://localhost:3000`

### Backend API Endpoints
- `POST /v1/api/USER/signup` - User registration
- `POST /v1/api/USER/login` - User login
- `GET /v1/api/GET_ALL_EXPENSE/:userId` - Get all expenses for user
- `POST /v1/api/CREATE_EXPENSE` - Create new expense
- `DELETE /v1/api/DELETE_EXPENSE/:id` - Delete expense
- `GET /v1/api/GET_SINGLE_EXPENSE/:id` - Get single expense
- `PATCH /v1/api/EDIT_EXPENSE/:id` - Update expense

## Frontend Setup

### 1. Navigate to Project Root
```bash
cd ..  # Go back to project root
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Configuration
Create `src/environments/environment.ts` and `src/environments/environment.prod.ts`:

```typescript
// src/environments/environment.ts
export const environment = {
  production: false,
  apiUrl: 'http://localhost:3000/v1/api/'
};

// src/environments/environment.prod.ts
export const environment = {
  production: true,
  apiUrl: 'https://your-backend-url.com/v1/api/'
};
```

### 4. Start Development Server
```bash
# Start Angular development server
ng serve

# OR with specific port
ng serve --port 4200
```

The frontend application will run on `http://localhost:4200`

### 5. Build for Production
```bash
# Build for production
ng build --configuration=production

# The build artifacts will be stored in the `dist/` directory
```

## Development Workflow

### Running Both Frontend and Backend
1. **Terminal 1 - Backend**:
   ```bash
   cd backend
   npm start
   ```

2. **Terminal 2 - Frontend**:
   ```bash
   ng serve
   ```

### Key Frontend Components
- **WelcomeComponent**: Landing page with login/signup
- **AddExpenseComponent**: Form for creating/editing expenses
- **ViewExpensesComponent**: Display and manage expenses
- **HeaderComponent**: Navigation and user actions

### Key Backend Models
- **UserModel**: User authentication and profile data
- **ExpenseModel**: Expense data structure with fields:
  - name, amount, expense_date, expense_category, payment, comment

---

Happy coding! 🚀
