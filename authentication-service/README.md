# Register/Login API with Express, Mysql, and JWT

## Features
1. User can sign up
2. User can sign in

## API endpoints

1. `POST /api/auth/signup`: Signup / Register a new user
2. `POST /api/auth/signin`: Signin / Login a User

## Body Payload Specification

### Register/Signup expects

```js
{
    firstname: string,
    lastname: string,
    phoneNumber: string,
    accountNumber: string,
    pin: string // Must be a 4 digit number
}
```

### Login/Signin expects

```js
{
    phoneNumber: string,
    pin: string // Must be a 4 digit number
}
```



## Tools / Libraries
* NodeJS - ExpressJS Server
* MySQL: Database
* JWT: Token based authentication
* bcryptjs: Password security / hasing
* winston/morgan: Logs
* Joi: Validations / Request body validator


## Available scripts
* `start`: Starts the server with node
* `start:dev`: Starts the server in watch mode
* `db:init`: Creates both the database and tables



## Getting started / Installation


```sh
git clone https://github.com/BisratYalew/ussd-api-project
```


Change to the newly downloaded directory with

```sh
cd ussd-api-project/authentication-service
```


Rename the file named `.env.example` to `.env` and update the variable values with valid ones

Install the required dependencies with

```sh
npm install    or    yarn install
```

Initialize the database with

```sh
npm run db:init
```

Start the app with

```sh
yarn start     or      npm run start
```

You can also start it in watch mode with or dev mode

```sh
yarn start:dev     or      npm run start:dev
```

## Folder structure
```sh
.
├── README.md
├── package-lock.json
├── package.json
└── src
    ├── app.js
    ├── config
    │   ├── db.config.init.js
    │   └── db.config.js
    ├── controllers
    │   └── auth.controller.js
    ├── database
    │   ├── queries.js
    │   └── scripts
    │       ├── dbDown.js
    │       ├── dbUp.js
    │       └── tablesUp.js
    ├── index.js
    ├── middlewares
    │   ├── asyncHandler.js
    │   ├── checkEmail.js
    │   └── validatorHandler.js
    ├── models
    │   └── user.model.js
    ├── routes
    │   └── auth.route.js
    ├── utils
    │   ├── logger.js
    │   ├── password.js
    │   ├── secrets.js
    │   └── token.js
    └── validators
        └── auth.js
```