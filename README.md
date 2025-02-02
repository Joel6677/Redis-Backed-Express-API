# Redis-Backend Express API

This is a Node.js and TypeScript-based API built with Express and Redis. It includes caching with Redis and follows best practices for TypeScript development.

## Features

- Express.js for the server framework
- Redis for caching venue data
- TypeScript for type safety
- Jest for testing
- Nodemon for development mode
- ESLint for linting
- Axios for making API requests
- Zod for data validation

## Requirements

- Node.js (>= 16.x)
- Redis (running locally or on a remote server)
- npm or yarn

## Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/Joel6677/Redis-Backend-Express-API.git
   cd Redis-Backend-Express-API
2. Install dependencies:
   ```sh
   npm install
3. Start the redis-server
    ```sh
    docker run --name redis-container -p 6379:6379 -d redis

## Running the Project

### Development Mode

- Run the app in development mode using Nodemon:
    ```sh
     npm run dev
    ```

### Build and start
- To build the project:
    ```sh
    npm run build
    ```
    
- To start the built project:
   ```sh
   npm start
   ```
### Running tests
- Run tests:
   ```sh
    npm test
   ```
- Run tests in watch mode:
   ```sh
    npm run test:watch
   ```






