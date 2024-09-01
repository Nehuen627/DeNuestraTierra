## Frontend

This is the frontend of the DeNuestraTierra web application. It is built using React, providing a dynamic and responsive user interface.

### Project Structure

- **src**: Contains the main source code for the frontend.
  - **index.js**: Entry point of the React application.
  - **App.js**: Main application component.
  - **components**: Reusable UI components.
  - **services**: API service functions to interact with the backend.
  - **styles**: CSS and styling files.

### Dependencies

The frontend relies on several key dependencies, including:
- **react**: JavaScript library for building user interfaces.
- **react-dom**: Entry point to the DOM and server renderers for React.
- **axios**: Promise-based HTTP client for making API requests.
- **react-router-dom**: Declarative routing for React applications.

### Scripts

- **start**: Runs the application in development mode.
- **build**: Builds the application for production.
- **test**: Runs the test suite.

### Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm start
   ```

### Folder Structure

- **public**: Static files and the HTML template.
- **assets**: Images, fonts, and other static assets.

### Components

The frontend is composed of reusable components that are organized in the `components` directory. Each component is designed to be modular and maintainable.

### API Services

The `services` directory contains functions for making API requests to the backend. These functions use `axios` to handle HTTP requests and responses.

### License

This project is licensed under the MIT License.