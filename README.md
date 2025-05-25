Task Management Frontend Documentation

This document provides instructions for setting up, running, and developing the Task Management Frontend project. This is a React application created with Create React App that interfaces with a Task Management API.

Before you begin, ensure you have the following installed on your system:

- [Node.js](https://nodejs.org/) (v14 or higher recommended)
- [npm](https://www.npmjs.com/) (comes with Node.js)
- Git

1. Clone the Repository

2. Install Dependencies

Install all required packages by running:

npm install

This will install all dependencies defined in the package.json file, including:

- React and React DOM
- Axios (for API requests)
- TailwindCSS (for styling)
- TypeScript
- Other project dependencies

3. Configure Environment Variables

Create a .env file in the root directory to configure the API URL:

REACT_APP_API_URL=https://localhost:5001/api
Adjust the URL if your backend API is running on a different host or port.

4. Start the Development Server

To run the application in development mode:

npm start

This will:

- Start the development server
- Open [http://localhost:3000](http://localhost:3000) in your default browser
- Enable hot reloading (changes will automatically refresh the page)

## Build for Production

When you're ready to deploy the application, create a production build:

npm run build

This generates optimized production files in the build directory that can be deployed to any hosting service.

Available Scripts

The project includes several npm scripts:

- `npm start` - Starts the development server
- `npm run build` - Creates a production build
- `npm run eject` - Ejects from Create React App (advanced, one-way operation)

## Project Structure

task-management-frontend/
├── public/ # Static files (HTML, favicon, etc.)
├── src/ # Source code
│ ├── assets/ # Images, fonts, etc.
│ ├── components/ # Reusable React components
│ │ ├── common/ # Shared UI components (Button, Input, etc.)
│ │ └── task/ # Task-specific components
│ ├── context/ # React context providers
│ ├── hooks/ # Custom React hooks
│ ├── models/ # TypeScript interfaces and enums
│ ├── pages/ # Page components
│ ├── services/ # API and other services
│ └── utils/ # Utility functions
├── .env # Environment variables
├── package.json # Project dependencies and scripts
└── tailwind.config.js # TailwindCSS configuration

## API Configuration

The application uses Axios for API requests. The API client is configured in api.ts and includes:

- Base URL configuration
- Request/response interceptors
- Error handling

## Development Notes

- TypeScript is used for type safety throughout the project
- TailwindCSS is used for styling

## Troubleshooting

### API Connection Issues

If you see network errors:

1. Ensure your backend API is running
2. Check that the `REACT_APP_API_URL` in your .env file points to the correct URL
3. Verify CORS is properly configured on the backend to allow requests from `http://localhost:3000`

### Package Installation Problems

If you encounter issues during `npm install`:

1. Delete the node_modules directory and package-lock.json file
2. Run `npm cache clean --force`
3. Run `npm install` again
