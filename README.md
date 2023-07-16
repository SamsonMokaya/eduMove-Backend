# eduMOVE

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/en/) (>= 10.16.0)
- PostgreSQL database

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/SamsonMokaya/eduMove-Backend.git


2. Create a .env file in the project root directory and provide the following environment variables:

   ```bash
   PORT=port_server_is_running_on
   DBPASSWORD=your_database_password
   ACCESS_TOKEN_SECRET=your_secret_token


3. Install dependencies:
   ```bash
   npm install bcrypt pg dotenv express express-async-handler jsonwebtoken


4. Set up a PostgreSQL database and configure the connection details in the .env file.


5. Import the SQL schema provided into your PostgreSQL database. You can use tools like pgAdmin or the psql command-line tool to import the schema.


6. Run the application:

   ```bash
   npm start

## API Endpoints

### Client

#### Register a client

Create an account for a client.

- **URL:** `/api/clients/register`
- **Method:** `POST`
- **Access:** `Public`

    ```bash
    // Request Body
    {
    "name": "John Doe",
    "password": "password123",
    "email": "john@example.com"
    }


    // Response
    {
    "message": "Account created successfully",
    "data": {
        "id": 1,
        "name": "John Doe",
        "email": "john@example.com"
    }
    }


#### Log in as a client
Log in to an existing client account.

- **URL:** `/api/clients/login``
- **Method:** `POST`
- **Access:** `Public`

    ```bash
    // Request Body
    {
    "email": "john@example.com",
    "password": "password123"
    }
    // Response
    {
    "accessToken": "<access_token>"
    }


#### Get current client

Get details of the currently logged-in client.

- **URL:** `/api/clients/current`
- **Method:** `GET`
- **Access:** Private (requires authentication token in the request headers)

    ```bash
    // Response
    {
        "id": 11,
        "name": "John Doe",
        "email": "johndoe@gmail.com",
        "iat": 1689525624,
        "exp": 1689526524
    }


#### Get rides for current client

Get a list of rides requested by the current client.

- **URL:** `/api/clients/myrides`
- **Method:** `GET`
- **Access:** Private (requires authentication token in the request headers)

##### Request

No additional parameters are required for this request.

##### Response

- **Status:** 200 OK
- **Content-Type:** application/json

    ```bash
    {
        "data": [
            {
            "id": 19,
            "client_id": 11,
            "driver_id": 4,
            "status": "waiting for approval",
            "client_name": "John Doe",
            "client_email": "johndoe@gmail.com",
            "driver_name": "Mary Leakey",
            "driver_email": "maryleakey@gmail.com"
            },
            {
            "id": 20,
            "client_id": 11,
            "driver_id": 4,
            "status": "waiting for approval",
            "client_name": "John Doe",
            "client_email": "johndoe@gmail.com",
            "driver_name": "Mary Leakey",
            "driver_email": "maryleakey@gmail.com"
            },
            {
            "id": 21,
            "client_id": 11,
            "driver_id": 4,
            "status": "waiting for approval",
            "client_name": "John Doe",
            "client_email": "johndoe@gmail.com",
            "driver_name": "Mary Leakey",
            "driver_email": "maryleakey@gmail.com"
            },
            {
            "id": 17,
            "client_id": 11,
            "driver_id": 4,
            "status": "approved",
            "client_name": "John Doe",
            "client_email": "johndoe@gmail.com",
            "driver_name": "Mary Leakey",
            "driver_email": "maryleakey@gmail.com"
            }
        ]
    }






