# Client Gateway

This project is a client-facing gateway built with [NestJS](https://nestjs.com/). It acts as the primary entry point for client applications interacting with the backend microservices.

## Table of Contents

- [Description](#description)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Running the Application](#running-the-application)
  - [API Endpoints](#api-endpoints)
- [Other Scripts](#other-scripts)
- [Running Tests](#running-tests)
- [Technologies Used](#technologies-used)
- [License](#license)

## Description

The Client Gateway is responsible for:
- Authenticating and authorizing incoming requests.
- Routing requests to the appropriate downstream microservices (`Products`, `Orders`).
- Aggregating and transforming data from multiple services.
- Providing a single, consistent API for client applications.

## Project Structure

```
.
├── src
│   ├── common
│   │   ├── dto
│   │   └── exceptions
│   ├── config
│   ├── orders
│   │   ├── dto
│   │   └── enum
│   └── products
│       └── dto
├── .gitignore
├── .prettierrc
├── .template.env
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

| Variable | Description | Default Value in `.template.env` |
| :--- | :--- | :--- |
| `PORT` | The port the app runs on. | `3000` |
| `PRODUCTS_MICROSERVICE_HOST` | Host for the Products microservice. | `localhost` |
| `PRODUCTS_MICROSERVICE_PORT` | Port for the Products microservice. | `3001` |
| `ORDERS_MICROSERVICE_HOST` | Host for the Orders microservice. | `localhost` |
| `ORDERS_MICROSERVICE_PORT` | Port for the Orders microservice. | `3002` |


## Running the Application

To run the application in development mode with file watching:

```bash
npm run start:dev
```

The application will be available at `http://localhost:3000`.

### API Endpoints

The gateway exposes the following endpoints:

#### Products
- `GET /api/products`: Get a paginated list of products.
- `GET /api/products/:id`: Get a single product by ID.
- `POST /api/products`: Create a new product.
- `PATCH /api/products/:id`: Update a product.
- `DELETE /api/products/:id`: Delete a product.

#### Orders
- `GET /api/orders`: Get a paginated list of orders. Can be filtered by status.
- `GET /api/orders/id/:id`: Get a single order by ID (UUID).
- `GET /api/orders/:status`: Get a paginated list of orders filtered by status (`PENDING`, `DELIVERED`, `CANCELLED`).
- `POST /api/orders`: Create a new order.
- `PATCH /api/orders/:id`: Change the status of an order.

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
- [Express](https://expressjs.com/)
- [Jest](https://jestjs.io/) for testing
- [ESLint](https://eslint.org/) for linting
- [Prettier](https://prettier.io/) for code formatting

## License

This project is UNLICENSED.
