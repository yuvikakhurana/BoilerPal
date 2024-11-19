# BoilerPal

## Table of Contents

- [Background](#background)
- [Requirements](#requirements)
- [Setup](#setup)
    - [Running Client and Server](#running-client-and-server)
- [Technologies](#technologies)
    - [Frontend](#frontend)
    - [Backend](#frontend)
- [API Documentation](#api-documentation)
  - [Status Codes](#status-codes)
  - [User Authentication API Endpoints](#user-authentication-api-endpoints)
  - [Dining API Endpoints](#dining-api-endpoints)

## Background

The current situation for both new and existing Purdue students is marked by fragmented and inefficient tools for managing class schedules, campus amenities, and daily activities. Typically, students find themselves having to utilize various applications, such as Brightspace, The Purdue Dining App, and third-party calendar/map apps, in order to stay organized. Our comprehensive web app, BoilerPal, seeks to address this challenge by providing a unified and intuitive platform for these tools which will be further enhanced by AI-powered assistance.

<!-- Description about the app -->

## Requirements

- Node.js
- MongoDB

## Setup
chat-app/client-vite-project/env.local:
```
VITE_BASE_URL=http://localhost:1337
VITE_PROJECT_ID=***
```

chat-app/server-vite-project/.env:
```
PORT=1337
OPEN_API_KEY=***
BOT_USER_NAME=AI_bot-Pete
BOT_USER_SECRET=purdue
PROJECT_ID=***
PRIVATE_KEY=***
```

Install all dependencies for `client/` and `server/`.

In two separate terminals:

```
cd client
npm install
```

```
cd server
npm install
```

Create `.env` files in both `client/` and `server/`

```
root/
  client/
    .env
  server/
    .env
```

`client/.env`

```
NODE_ENV=development
REACT_APP_SERVER_URL=http://localhost:3000
```

`server/.env`

```
NODE_ENV=development
PORT=5000
MONGO_URI=***
JWT_SECRET=***
BASE_URL=http://localhost:3000/
```

### Running client and server

In a terminal

```
cd client
npm run dev
```

## Technologies

### Frontend

- [React.js](https://reactjs.org/)
  - [Create-react-app](https://create-react-app.dev/)
- [React-Bootstrap](https://react-bootstrap.netlify.app)
- [React-Redux](https://react-redux.js.org/)
  - [Redux-toolkit](https://redux-toolkit.js.org/)

### Backend

- [MongoDB](https://www.mongodb.com/)
  - [Mongoose](https://mongoosejs.com/)
- [Express.js](https://expressjs.com/)

## Status Codes

`200 OK` - The request succeeded.

`201 CREATED` - The request succeeded, and a new resource was created as a result. 

`400 Bad Request` - The server cannot or will not process the request due to something that is perceived to be a client error.

`401 Unauthorized` - Client is not authenticated and trying to access an endpoint that requires authentication. This occurs if the request is missing an authorization header, has an authorization header but it is expired, or has an invalid authorization header.

`404 Not Found` - The server can not find the requested resource. In the browser, this means the URL is not recognized. In an API, this can also mean that the endpoint is valid but the resource itself does not exist. In our case, if it returns without any specific information, it is the wrong type of request for that respective endpoint.

`500 Internal Server Error` - The server has encountered a situation it does not know how to handle. If we see this, it is not good as it means we have a bug and it is actually breaking the web app.

## User Authentication API Endpoints

### **1. POST /api/users**

**Description:** Accepts a JSON body to create a user. Is not token protected.

**Expected Response:** 201 response with confirmation.

**Sample Successful Response:**

_Status Code:_ 201

_Request Body:_

```
{
  "name": "John Doe",
  "email": "johndoe@gmail.com",
  "password": "password123"
}
```

_Response Body:_

```
{
    "_id": "65283492ffe05e34efc1a1f0",
    "name": "John Doe",
    "email": "johndoe@gmail.com",
    "verified": false
}
```

**Possible Errors:** In terms of errors, a 400 error is possible if the inputted user already exists or the inputted data is incorrect. 

**Sample Failure Response:**

_Status Code:_ 400

_Request Body:_

```
{
  "name": "John Doe",
  "email": "johndoe@gmail.com",
  "password": "password123"
}
```

_Response Body:_

```
{
    "message": "User already exists",
    "stack": "Error: User already exists\n    at ..."
}
```

### **2. POST /api/users/auth**

**Description:** Accepts a JSON body to login a user. Is not token protected.

**Expected Response:** 200 response with confirmation.

**Sample Successful Response:**

_Status Code:_ 200

_Request Body:_

```
{
  "email": "johndoe@gmail.com",
  "password": "password123"
}
```

_Response Body:_

```
{
    "_id": "65283492ffe05e34efc1a1f0",
    "name": "John Doe",
    "email": "johndoe@gmail.com",
    "verified": false
}
```

**Possible Errors:** In terms of errors, a 400 or 401 error is possible if the user hasnt verified their email or inputs the invalid email or password.

**Sample Failure Response:**

_Status Code:_ 400

_Request Body:_

```
{
  "email": "johndoe@gmail.com",
  "password": "password123"
}
```

_Response Body:_

```
{
    "message": "An Email sent to your account please verify"
}
```

### **3. POST /api/users/logout**

**Description:** Accepts a JSON body to logout a user. Is token protected.

**Expected Response:** 200 response with confirmation.

**Sample Successful Response:**

_Status Code:_ 200

_Request Body:_

```
Nothing, the JWT is in the cookies
```

_Response Body:_

```
{
    "message": "User logged out"
}
```

**Possible Errors:** In terms of errors, if there is no JWT in the cookies, you get a 401 error.

**Sample Failure Response:**

_Status Code:_ 401

_Request Body:_

```
No JWT in cookies
```

_Response Body:_

```
{
    "message": "Not authorized, no token",
    "stack": "Error: Not authorized, no token\n    at ..."
}
```

### **4. GET /api/users/profile**

**Description:** Accepts a JWT cookie and gets info of current user. Is token protected.

**Expected Response:** 200 response with confirmation.

**Sample Successful Response:**

_Status Code:_ 200

_Request Body:_

```
Nothing, the JWT is in the cookies
```

_Response Body:_

```
{
    "_id": "65283492ffe05e34efc1a1f0",
    "name": "John Doe",
    "email": "johndoe@gmail.com"
}
```

**Possible Errors:** In terms of errors, if there is no JWT in the cookies, you get a 401 error.

**Sample Failure Response:**

_Status Code:_ 401

_Request Body:_

```
Nothing, the JWT is in the cookies
```

_Response Body:_

```
{
    "message": "Not authorized, no token",
    "stack": "Error: Not authorized, no token\n    at ..."
}
```

### **5. PUT /api/users/profile**

**Description:** Accepts a JWT cookie and updated fields in body and updates info of current user. Is token protected.

**Expected Response:** 200 response with confirmation.

**Sample Successful Response:**

_Status Code:_ 200

_Request Body:_

```
{
    "name": "Jack Doe",
    "email": "jackdoe@gmail.com"
}
```

_Response Body:_

```
{
    "_id": "65283492ffe05e34efc1a1f0",
    "name": "Jack Doe",
    "email": "jackdoe@gmail.com"
}
```

**Possible Errors:** In terms of errors, if there is no JWT in the cookies or if the user is not found you will get a 400 or 404 error.

**Sample Failure Response:**

_Status Code:_ 400

_Request Body:_

```
Nothing, the JWT is in the cookies
```

_Response Body:_

```
{
    "message": "Not authorized, no token",
    "stack": "Error: Not authorized, no token\n    at ..."
}
```

### **6. GET /api/users/verify/:id/:token**

**Description:** Accepts paramaters in link, once request is sent it changes verfied field in user instance.

**Expected Response:** 200 response with confirmation.

**Sample Successful Response:**

_Status Code:_ 200

_Request Body:_

```
Nothing, the user ID and verification token is in the parameters
```

_Response Body:_

```
{
    "message": "email verified successfully"
}
```

**Possible Errors:** In terms of errors, if the request paramaters are malformed in any way it returns a 400 response.

**Sample Failure Response:**

_Status Code:_ 400

_Request Body:_

```
Nothing, the user ID and verification token is in the parameters
```

_Response Body:_

```
{
    "message": "Invalid link"
}
```

### **7. POST /api/users/password-reset**

**Description:** Accepts email in body and sends reset password link.

**Expected Response:** 200 response with confirmation.

**Sample Successful Response:**

_Status Code:_ 200

_Request Body:_

```
{
    "email": "jonhdoe@gmail.com"
}
```

_Response Body:_

```
{
    message: "Password reset link sent to your email account"
}
```

**Possible Errors:** In terms of errors, if the email isnt in the database it will send a 400 error and if there is an internal server problem it will send a 500 error.

**Sample Failure Response:**

_Status Code:_ 400

_Request Body:_

```
{
    "email": "fakeemail123@gmail.com"
}
```

_Response Body:_

```
{
    "message": "User with given email does not exist!",
    "stack": "Error: User with given email does not exist!\n    at ..."
}
```

### **8. GET /api/users/password-reset/:id/:token**

**Description:** Verifies reset password link.

**Expected Response:** 200 response with confirmation.

**Sample Successful Response:**

_Status Code:_ 200

_Request Body:_

```
Nothing, the user ID and verification token is in the parameters
```

_Response Body:_

```
{
    "message": "Valid link",
}
```

**Possible Errors:** In terms of errors, if the the user id or forgot password token isnt valid it will send a 400 error and if there is an internal server problem it will send a 500 error.

**Sample Failure Response:**

_Status Code:_ 400

_Request Body:_

```
Nothing, the user ID and verification token is in the parameters
```

_Response Body:_

```
{
    "message": "Invalid link",
}
```

### **9. POST /api/users/password-reset/:id/:token**

**Description:** Accepts paramaters in link, once request is sent it changes password in user instance.

**Expected Response:** 200 response with confirmation.

**Sample Successful Response:**

_Status Code:_ 200

_Request Body:_

```
Nothing, the user ID and verification token is in the parameters
```

_Response Body:_

```
{
    "message": "Password reset successfully",
}
```

**Possible Errors:** In terms of errors, if the the user id, forgot password token, or inputted password isnt valid it will send a 400 error and if there is an internal server problem it will send a 500 error.

**Sample Failure Response:**

_Status Code:_ 400

_Request Body:_

```
Nothing, the user ID and verification token is in the parameters
```

_Response Body:_

```
{
    "message": "Invalid link",
}
```

## Dining API Endpoints
N/A
