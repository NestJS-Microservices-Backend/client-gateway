# Client Gateway

This project is a client-facing gateway built with [NestJS](https://nestjs.com/). It acts as the primary entry point for client applications, communicating with backend microservices via a [NATS](https://nats.io/) message broker.

## Table of Contents

- [Description](#description)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Running the Application](#running-the-application)
  - [API Endpoints](#api-endpoints)
- [Docker Support](#docker-support)
- [Other Scripts](#other-scripts)
- [Running Tests](#running-tests)
- [Technologies Used](#technologies-used)
- [Contributing](#contributing)
- [License](#license)

## Description

The Client Gateway is the main entry point for all client-side requests. It serves as an API Gateway that sits between the client applications and a set of backend microservices.

Its primary responsibilities are:
- **Request Handling:** Receiving HTTP requests from clients.
- **Service Discovery:** Routing incoming requests to the appropriate downstream microservice (e.g., Products, Orders).
- **Protocol Translation:** Communicating with microservices over a message broker (NATS).
- **Error Handling:** Providing a centralized exception filter for microservice responses.
- **Validation:** Enforcing request data validation using global pipes.

This architecture decouples the client from the backend services, allowing for greater flexibility and scalability.

## Project Structure

```
.
├── src
│   ├── common          # Shared modules, DTOs, and exception filters
│   │   ├── dto
│   │   └── exceptions
│   ├── config          # Environment variable and service configuration
│   ├── orders          # Orders module (controller, DTOs)
│   │   ├── dto
│   │   └── enum
│   ├── products        # Products module (controller, DTOs)
│   │   └── dto
│   └── transports      # NATS transport client module
│       └── nats.module.ts
├── .dockerignore
├── .gitignore
├── .prettierrc
├── .template.env       # Template for environment variables
├── Dockerfile
├── eslint.config.mjs
├── nest-cli.json
├── package.json
├── README.md
└── tsconfig.json
```

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/en/) (v18 or higher recommended)
- [npm](https://www.npmjs.com/)
- [Docker](https://www.docker.com/) (for containerized setup)
- A running NATS server instance.

### Installation

1.  Clone the repository:
    ```bash
    git clone <repository-url>
    ```
2.  Navigate to the project directory:
    ```bash
    cd client-gateway
    ```
3.  Install the dependencies:
    ```bash
    npm install
    ```

## Environment Variables

This project uses environment variables for configuration. Create a `.env` file in the root of the project by copying the template:

```bash
cp .template.env .env
```

Modify the `.env` file with your specific configuration. The following variables are required:

| Variable      | Description                       | Default Value in `.template.env`     |
| :------------ | :-------------------------------- | :----------------------------------- |
| `PORT`        | The port the app runs on.         | `3000`                               |
| `NATS_SERVERS`| Comma-separated list of NATS server URLs. | `["nats://localhost:4222"]` |


## Running the Application

To run the application in development mode with file watching:

```bash
npm run start:dev
```

The application will be available at `http://localhost:3000`. All endpoints are prefixed with `/api`.

### API Endpoints

The gateway exposes the following endpoints:

#### Products
- `POST /api/products`: Create a new product.
- `GET /api/products`: Get a paginated list of products.
- `GET /api/products/:id`: Get a single product by ID.
- `PATCH /api/products/:id`: Update a product.
- `DELETE /api/products/:id`: Delete a product.

#### Orders
- `POST /api/orders`: Create a new order.
- `GET /api/orders`: Get a paginated list of orders. Can be filtered by status.
- `GET /api/orders/id/:id`: Get a single order by ID (UUID).
- `GET /api/orders/:status`: Get a paginated list of orders filtered by status (`PENDING`, `DELIVERED`, `CANCELLED`).
- `PATCH /api/orders/:id`: Change the status of an order.

## Docker Support

This application includes a `Dockerfile` for containerization.

1.  **Build the Docker image:**
    ```bash
    docker build -t client-gateway .
    ```

2.  **Run the Docker container:**
    Make sure you have a `.env` file created, as the container uses it.
    ```bash
    docker run --env-file .env -p 3000:3000 client-gateway
    ```
    *The `-p 3000:3000` flag maps the container's port 3000 to your host machine's port 3000.*

## Other Scripts

-   **Build for production:**
    ```bash
    npm run build
    ```

-   **Run in production:**
    ```bash
    npm run start:prod
    ```

-   **Lint and format:**
    ```bash
    npm run lint
    npm run format
    ```

## Running Tests

-   **Execute unit tests:**
    ```bash
    npm run test
    ```

-   **Execute end-to-end (e2e) tests:**
    ```bash
    npm run test:e2e
    ```

-   **Generate test coverage report:**
    ```bash
    npm run test:cov
    ```

## Technologies Used

- [NestJS](https://nestjs.com/)
- [TypeScript](https://www.typescriptlang.org/)
- [NATS](https://nats.io/) for microservice communication
- [Docker](https://www.docker.com/)
- [Express](https://expressjs.com/)
- [Jest](https://jestjs.io/) for testing
- [ESLint](https://eslint.org/) for linting
- [Prettier](https://prettier.io/) for code formatting

## Contributing

Contributions are welcome! Please follow these steps:
1. Fork the repository.
2. Create a new branch (`git checkout -b feature/your-feature-name`).
3. Make your changes.
4. Commit your changes (`git commit -m 'feat: Add some feature'`).
5. Push to the branch (`git push origin feature/your-feature-name`).
6. Open a pull request.

## License

This project is UNLICENSED.
