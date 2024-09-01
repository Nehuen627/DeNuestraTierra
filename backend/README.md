## Backend
## Backend

This is the backend of the DeNuestraTierra web application. It is built using Node.js and Express, providing a robust and scalable foundation for the application's server-side logic.

### Project Structure

- **src**: Contains the main source code for the backend.
  - **app.js**: Initializes the Express application and sets up middleware.
  - **server.js**: Starts the server and listens on the specified port.
  - **config**: Configuration files for environment variables.
  - **routers**: Contains the route handlers for different endpoints.
  - **utils**: Utility functions used across the application.

### Dependencies

The backend relies on several key dependencies, including:
- **express**: Web framework for Node.js.
- **cors**: Middleware for enabling Cross-Origin Resource Sharing.
- **dotenv**: Loads environment variables from a `.env` file.
- **nodemon**: Utility that monitors for changes in the source code and automatically restarts the server.

### Scripts

- **start**: Runs the application.
- **dev**: Runs the application in development mode with `nodemon`.

### Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Create a `.env` file in the root directory and add the necessary environment variables:
   ```plaintext
   NODE_ENV=development
   PORT=8080
   WEB_URL=http://localhost:3000
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

### Folder Structure

- **public**: Static files served by the backend.
- **images**: Contains default images used in the application.

### API Endpoints

The backend exposes several API endpoints to interact with the frontend. These endpoints are defined in the `routers` directory. As the project evolves, more detailed documentation for each endpoint will be provided.

### License

This project is licensed under the MIT License.