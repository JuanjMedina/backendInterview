<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" **target**="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

# Backend Interview Project

A NestJS-based backend application with user management, authentication, and geo-data for Colombia.

## Dependencies

This project uses the following main dependencies:

- NestJS v11
- TypeORM
- PostgreSQL
- Swagger for API documentation
- JSON Web Token for authentication

## Project Setup

```bash
# Install dependencies using pnpm
$ pnpm install
```

## Environment Configuration

The application uses different environment files based on the running environment:

### Development Environment (.env.development)

```
PORT=3000
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=root
DB_NAME=interview
NODE_ENV=development
JWT_SECRET=secret
SALT_ROUNDS=10
```

### Production Environment (.env.production)

For production, you should create a `.env.production` file in the `src` directory with the following variables:

```
PORT=80
DB_HOST=your-production-db-host
DB_PORT=5432
DB_USER=your-production-db-user
DB_PASSWORD=your-production-db-password
DB_NAME=your-production-db-name
NODE_ENV=production
JWT_SECRET=your-secure-jwt-secret
SALT_ROUNDS=10
```

## Database Setup

The application uses PostgreSQL. Make sure you have PostgreSQL installed and running with the credentials specified in your environment file.

1. Create a PostgreSQL database with the name specified in your environment file
2. The application will automatically create the tables and relationships when started (synchronize: true)

## Available Commands

```bash
# Run in development mode
$ pnpm run start:dev

# Run in debug mode
$ pnpm run start:debug

# Build the application
$ pnpm run build

# Run in production mode
$ pnpm run start:prod

# Lint the code
$ pnpm run lint

# Format the code
$ pnpm run format

# Run tests
$ pnpm run test
$ pnpm run test:watch
$ pnpm run test:cov
$ pnpm run test:e2e

# Run the Colombia seed script to populate departments and cities
$ pnpm run seed:colombia
```

## Colombia Data Seeding

The project includes a seed script to populate the database with Colombia's departments and cities. To run it:

```bash
$ pnpm run seed:colombia
```

This command will:

1. Connect to the database using the environment configuration
2. Load department and city data from the `src/utils/colombia.json` file
3. Insert all departments and their corresponding cities into the database

## API Documentation

Once the application is running, you can access the Swagger API documentation at:

```
http://localhost:3000/api
```

## Authentication

The API uses JWT-based authentication. To access protected endpoints:

1. First obtain a JWT token by authenticating
2. Include the token in subsequent requests in the Authorization header as "Bearer {token}"


## Project setup

```bash
$ pnpm install
```

## Compile and run the project

```bash
# development
$ pnpm run start

# watch mode
$ pnpm run start:dev

# production mode
$ pnpm run start:prod
```

## Run tests

```bash
# unit tests
$ pnpm run test

# e2e tests
$ pnpm run test:e2e

# test coverage
$ pnpm run test:cov
```
