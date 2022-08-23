# Review Avengers: Endgame Movie API

## API Document

Check API document [here]()

## Schema

#### User

| Key      | Type       | Note             |
| -------- | ---------- | ---------------- |
| email    | String     | required, unique |
| username | String     | required         |
| password | String     | required         |
| reviews  | ObjectId[] | required         |

#### Review

| Key     | Type       | Note     |
| ------- | ---------- | -------- |
| stars   | Number     | required |
| title   | String     | required |
| content | String     | required |
| creator | ObjectId[] | required |

## Middleware

- `body-parser`: Middleware for parsing incoming request bodies before handling.
- `cors`: Middleware for enabling CORS with options.
- `express-async-handler`: Middleware for handling exceptions inside of async express routes and passing to express error handlers.
- `express-validator`: Middleware for handling validation data, wraps validator.js validator and sanitizer functions.

## Authentication

Authentication using JWT token

- Get token from request headers
- Decode token using `jwt.verify()`
- Attach `user` to request

All requests pass `authMiddleware` has `user` data in it

## Usage

- Install dependencies:

```
npm install
```

- Run dev server (nodemon):

```
npm run dev
```

## Extend project

- Create `entry` routes middleware in `server.js`
- Create `entry` model using `mongoose.model()` in `models`
- Create `entry` controller functions in `controllers`
- Create `entry` validation handler in `validation`
- Create `entry` endpoints in `routes`

## HTTP status code

| Code | Name                  | Description                                                                                  |
| ---- | --------------------- | -------------------------------------------------------------------------------------------- |
| 200  | OK                    | The request succeeded                                                                        |
| 201  | Created               | The request succeeded, and a new resource was created as a result                            |
| 400  | Bad Request           | The server cannot process the request due to client error (eg. request syntax)               |
| 401  | Unauthorized          | Lacks valid authentication credentials for the requested resource                            |
| 403  | Forbidden             | The server understands the request but refuses to authorize it                               |
| 404  | Not found             | The server cannot find the requested resource                                                |
| 422  | Unprocessable Entity  | The server was unable to process the contained instructions                                  |
| 500  | Internal Server Error | The server encountered an unexpected condition that prevented it from fulfilling the request |
