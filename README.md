# Hangry Case Study

This is my submission for Hangry's Backend Engineer Intern case study. Built with Node.js and Typescript.

# Libraries Used

- date-fns: For validating date format
- dotenv: For environment variables
- mysql2: For connection to database (MySQL)
- validator: For validating email

# Installation instruction

- Clone this repository
- Prepare a MySQL database instance with the following table

```
CREATE TABLE USERS (
    id varchar(255) NOT NULL,
    name varchar(255) NOT NULL,
    email varchar(255) NOT NULL UNIQUE,
    birthdate varchar(255) NOT NULL,
    PRIMARY KEY (id)
);
```

- Create a `.env` file with the following content:
  1. PORT = The port the server will listen in
  2. DB_HOST= Host for database
  3. DB_USER= The username of the database owner
  4. DB_PASSWORD= The password for the database owner
  5. DB_NAME= The name of the database
- Run `npm install` to install dependencies
- Run `npm run build` to compile the typescript files
- Run `npm run start` to run the application

# Documentation

This is the documentation for the routes available in this API. All API has baseURL/API/v0 appended in the front.

## `/users GET`

Route for retrieving information for all user accounts

- 200 Status Code Response Example (Data retrieved successfully):

```
{
    "status": true,
    "message": "Users data successfully fetched",
    "data": [
        {
            "id": "9070a5f9-6429-4aad-874a-dbe22c79cf0d",
            "name": "Kade Satrya",
            "email": "Kade@ggl.com",
            "birthdate": "11-03-2003"
        },
        {
            "id": "67da8ccf-73fe-42e8-9e28-5f68fcb4680c",
            "name": "Noto Sadharma",
            "email": "Noto@ggl.com",
            "birthdate": "11-02-2003"
        }
    ]
}
```

## `/users/{id} GET`

Route for retrieving information for a certain user account based on id

- 200 Status Code Response Example (Data retrieved successfully):

```
{
    "status": true,
    "message": "User data successfully fetched",
    "data": {
        "id": "9070a5f9-6429-4aad-874a-dbe22c79cf0d",
        "name": "Kade Satrya",
        "email": "Kade@ggl.com",
        "birthdate": "11-03-2003"
    }
}
```

- 404 Status Code Response Example (Invalid User ID):

```
{
    "status": false,
    "message": "User Not Found"
}
```

## `/users/create POST`

Route for adding user account information

- Valid request format:

```
{
    "name": string, required
    "email": string in x@x.x format, required, unique
    "birthdate": string in dd-mm-yyyy format, required
}
```

- Valid request example:

```
{
    "name": "Sadharma"
    "email": "Dharma@Sad.id"
    "birthdate": "11-2-2004"
}
```

- 200 Status Code Response Example (Data created successfully):

```
{
    "status": true,
    "message": "User data successfully added",
    "data": {
        "id": "9070a5f9-6429-4aad-874a-dbe22c79cf0d",
        "name": "Kade Satrya",
        "email": "Kade@ggl.com",
        "birthdate": "11-03-2003"
    }
}
```

- 400 Status Code Response Example (Invalid or missing input, same email address):

```
{
    "status": false,
    "message": "Email already taken"
}
```

## `/users/{id} PUT`

Route for editing user account information

- Valid request format:

```
{
    "name": string, required
    "email": string in x@x.x format, required, unique
    "birthdate": string in dd-mm-yyyy format, required
}
```

- Valid request example:

```
{
    "name": "Sadharma"
    "email": "Dharma@Sad.id"
    "birthdate": "11-2-2004"
}
```

- 200 Status Code Response Example (Data edited successfully):

```
{
    "status": true,
    "message": "User data successfully edited",
    "data": {
        "id": "9070a5f9-6429-4aad-874a-dbe22c79cf0d",
        "name": "Kade Satrya",
        "email": "Kade@ggl.com",
        "birthdate": "11-03-2003"
    }
}
```

- 400 Status Code Response Example (Invalid or missing input, same email address):

```
{
    "status": false,
    "message": "Email already taken"
}
```

- 404 Status Code Response Example (Invalid User ID):

```
{
    "status": false,
    "message": "User Not Found"
}
```

## `/users/{id} DELETE`

- 200 Status Code Response Example (Data deleted successfully):
  Route for deleting user account information

```
{
    "status": true,
    "message": "User data successfully deleted",
}
```
