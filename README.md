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
   npm install bcrypt pg dotenv express express-async-handler jsonwebtoken nodemon


4. Set up a PostgreSQL database and configure the connection details in the .env file.


5. Import the SQL schema provided into your PostgreSQL database. You can use tools like pgAdmin or the psql command-line tool to import the schema.


6. Run the application:

   ```bash
   npm run dev

## API Endpoints

### Base url - `http://localhost:{server_port_number}/`

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

- **URL:** `/api/clients/login`
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
- **Access:** `Private (requires authentication token in the request headers)`

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
- **Access:** `Private (requires authentication token in the request headers)`

    ```bash
    //Response body
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
            ...
        ]
    }

### Rides

#### Get all rides

Get a list of all rides.

- **URL:** `/api/rides`
- **Method:** `GET`
- **Access:** `Private (requires authentication token in the request headers)`


    ```bash
    {
        "data": [
            {
            "id": 18,
            "client_id": 12,
            "driver_id": 5,
            "status": "waiting for approval",
            "client_name": "Jane Doe",
            "client_email": "janedoe@gmail.com",
            "driver_name": "Chaarles Darwin",
            "driver_email": "charlesdarwin@gmail.com"
            },
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
            ...
        ]
    }


#### Get a ride

Get details of a specific ride.

- **URL:** `/api/rides/:id`
- **Method:** `GET`
- **Access:** `Private (requires authentication token in the request headers)`


- **Params:**
  - `id` (required): The ID of the ride to retrieve.

    ```bash
    {
        "data": {
            "id": 19,
            "client_id": 11,
            "driver_id": 4,
            "status": "waiting for approval",
            "client_name": "John Doe",
            "client_email": "johndoe@gmail.com",
            "driver_name": "Mary Leakey",
            "driver_email": "maryleakey@gmail.com"
        }
    }


#### Book a ride

Book a new ride.

- **URL:** `/api/rides`
- **Method:** `POST`
- **Access:** `Private (requires authentication token in the request headers)`


    ```bash
    // Request Body
    {
        "client_id": 11,
        "driver_id": 4
    }
    
    // Response
    {
        {
            "message": "Ride booked successfully",
            "data": {
                "id": 22,
                "client_id": 11,
                "driver_id": 4,
                "status": "waiting for approval",
                "client_name": "John Doe",
                "client_email": "johndoe@gmail.com",
                "driver_name": "Mary Leakey",
                "driver_email": "maryleakey@gmail.com"
        }
    }


#### Update a ride

Update the details of a booked ride.

- **URL:** `/api/rides/:id`
- **Method:** `PUT`
- **Access:** `Private (requires authentication token in the request headers)`


    ```bash
    //Request body
    {
        "client_id": 11,
        "driver_id": 5
    }

    //Response
    {
        "message": "Ride updated successfully",
        "data": {
            "id": 18,
            "client_id": 11,
            "driver_id": 5,
            "status": "waiting for approval",
            "client_name": "John Doe",
            "client_email": "johndoe@gmail.com",
            "driver_name": "Chaarles Darwin",
            "driver_email": "charlesdarwin@gmail.com"
        }
    }


#### Delete a ride

Delete a booked ride.

- **URL:** `/api/rides/:id`
- **Method:** `DELETE`
- **Access:** `Private (requires authentication token in the request headers)`

    ```bash
        {
            "message": "Ride deleted successfully",
            "data": {
                "id": 18,
                "client_id": 11,
                "driver_id": 5,
                "status": "waiting for approval",
                "client_name": "John Doe",
                "client_email": "johndoe@gmail.com",
                "driver_name": "Chaarles Darwin",
                "driver_email": "charlesdarwin@gmail.com"
            }
    }


### Drivers

#### Register a driver

Create a new driver account.

- **URL:** `/api/drivers/register`
- **Method:** `POST`
- **Access:** Public


    ```bash
    // Request body
    {
    "name": "Driver 1" ,
    "email": "driver1@gmail.com",
    "password": "driver1"
    }

    //Response
    {
        "message": "Driver account created successfully",
        "data": {
            "id": 6,
            "name": "Driver 1",
            "email": "driver1@gmail.com",
            "password": "$2b$10$H7V98adQb1mgNrSTKpBdmOYbmEzjGZjVFmBU2FwdH3LllLgz5Zw6m"
        }
    }


#### Log in to driver account

Authenticate and obtain an access token for a driver account.

- **URL:** `/api/drivers/login`
- **Method:** `POST`
- **Access:** `Public`

    ```bash
        {
            "accessToken": "access_token"
        }


### Get rides for current driver

Get a list of rides requested by the current driver.

- **URL:**: /api/drivers/myrides
- **Method:** `GET`
- **Access:** `Private(requires authentication token in the request headers)`

    ```bash
    //Response body
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
        ]
        ...
    }


### Approve or reject a ride

Update the status of a ride as approved or rejected.

- **URL:**: /api/drivers/:id
- **Method:** `PUT`
- **Access:** `Private(requires authentication token in the request headers)`

    ```bash
    //Request body
    {
        "status": "approved"
    }

    //Response
    {
        "message": "Ride status updated successfully",
        "data": {
            "id": 21,
            "client_id": 11,
            "driver_id": 4,
            "status": "approved",
            "client_name": "John Doe",
            "client_email": "johndoe@gmail.com",
            "driver_name": "Mary Leakey",
            "driver_email": "maryleakey@gmail.com"
        }
    }

## Admin

### Register an admin

Register a new admin account.


- **URL:**: `/api/admin/register`
- **Method:** `POST`
- **Access:** `Public`

    ```bash
    //Request body
    {
        "name": "admin5",
        "password": "admin5"
    }

    //Reponse
    {
        "message": "Admin registered successfully."
    }


### Admin Login

Authenticate and obtain an access token for an admin account.

- **URL:**: `/api/admin/login`
- **Method:** `POST`
- **Access:** `Public`

    ```bash
    // Request Body
    {
        "name": "Admin1",
        "password": "admin123"
    }

    // Response
    {
        "token": "<access_token>"
    }


### Get All Drivers

Retrieve a list of all drivers.


- **URL:**: `/api/admin/drivers`
- **Method:** `GET`
- **Access:** `Private (requires authentication token in the request headers)`

    ```bash
    {
        "data": [
            {
            "id": 4,
            "name": "Mary Leakey",
            "email": "maryleakey@gmail.com",
            "password": "$2b$10$ZSx1BdpizrvL6wd7mCy2cuQAqc355zL4hSHzf4y7wjvzUkvGOaJmW"
            },
            {
            "id": 5,
            "name": "Chaarles Darwin",
            "email": "charlesdarwin@gmail.com",
            "password": "$2b$10$YikT1fqI0vhkD0dBjq8poeMa.hY5ftcY43du4jzXfpBkHHaCdf9K6"
            },
            ...
        ]
    }


### Get All Clients

Retrieve a list of all clients.

- **URL:**: `/api/admin/clients`
- **Method:** `GET`
- **Access:** `Private (requires authentication token in the request headers)`

    ```bash
    //Response
    {
        "data": [
            {
            "id": 11,
            "name": "John Doe",
            "password": "$2b$10$.b2U0mS6Sx983RTOmOJsyOYn/z4iPzYjgZ1YYtyXzTGaYTzeu7pdC",
            "email": "johndoe@gmail.com"
            },
            {
            "id": 12,
            "name": "Jane Doe",
            "password": "$2b$10$6q7tY2eAugklGv4TmpkXyer2vbY3Apa64DAGYcEirraJ/GA69kchG",
            "email": "janedoe@gmail.com"
            }
        ]
    }


### Get Booked Rides

Retrieve a list of all booked rides.

- **URL:**: `/api/admin/rides`
- **Method:** `GET`
- **Access:** `Private (requires authentication token in the request headers)`

    ```bash
    //Response
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
            ...
        ]
    }


### Get a single ride

Retrieve a single ride.

- **URL:**: `/api/admin/rides/:id`
- **Method:** `GET`
- **Access:** `Private (requires authentication token in the request headers)`

    ```bash
    //Response
    {
        "data": {
            "id": 19,
            "client_id": 11,
            "driver_id": 4,
            "status": "waiting for approval",
            "client_name": "John Doe",
            "client_email": "johndoe@gmail.com",
            "driver_name": "Mary Leakey",
            "driver_email": "maryleakey@gmail.com"
        }
    }

### Create a Client

Create a new client account.

- **URL:**: `/api/admin/clients`
- **Method:** `POST`
- **Access:** `Private (requires authentication token in the request headers)`

    ```bash
    //Request body
    {
        "name": "Jane Doe",
        "email": "janedoe@example.com",
        "password": "janedoe"
    }

    //Response
    {
        "message": "Client created successfully",
        "data": {
            "id": 13,
            "name": "Jane Doe",
            "password": "$2b$10$Lqwdzy7VXv1fYck08pQ.MOabbND8T569XTnLTivi5T7rktMEtjbtG",
            "email": "janedoe@example.com"
        }
    }

### Create a new driver

Create a new driver account.

- **URL:**: `/api/admin/drivers`
- **Method:** `POST`
- **Access:** `Private (requires authentication token in the request headers)`

    ```bash
    //Request body
    {
        "name": "driver25",
        "email": "driver25@gmail.com",
        "password": "driver25"
    }
    //Response
    {
        "message": "Driver created successfully",
        "data": {
            "id": 7,
            "name": "driver25",
            "email": "driver25@gmail.com",
            "password": "$2b$10$y53y3v6DJTiQqTmXfPk9BeCYO95Q1wEWhaYcWjviDMNObZEbNuChK"
        }
    }

### Reschedule a booked ride

Reschedule a booked ride.

- **URL:**: `/api/admin/rides/:id`
- **Method:** `PUT`
- **Access:** `Private (requires authentication token in the request headers)`

    ```bash
    //Request body
    {
        "client_id": 12,
        "driver_id": 5,
        "status": "approved"
    }

    //Response
    {
        "message": "Ride updated successfully",
        "data": {
            "id": 19,
            "client_id": 12,
            "driver_id": 5,
            "status": "approved",
            "client_name": "John Doe",
            "client_email": "johndoe@gmail.com",
            "driver_name": "Mary Leakey",
            "driver_email": "maryleakey@gmail.com"
        }
    }


### Delete a Booked Ride

Delete a booked ride from the system.

- **URL:**: `/api/admin/rides/:id`
- **Method:** `DELETE`
- **Access:** `Private (requires authentication token in the request headers)`

    ```bash
    //Response
    {
        "message": "Booked ride deleted successfully",
        "data": {
            "id": 19,
            "client_id": 12,
            "driver_id": 5,
            "status": "approved",
            "client_name": "John Doe",
            "client_email": "johndoe@gmail.com",
            "driver_name": "Mary Leakey",
            "driver_email": "maryleakey@gmail.com"
        }
    }