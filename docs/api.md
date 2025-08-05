# API Documentation

## Base URL

The base URL for the API is:

http://localhost:5000/api

## Endpoints

### Contributions

#### Create Contribution

- **POST** `/contributions`
- **Description**: Create a new contribution.
- **Request Body**:
    ```json
    {
        "walletAddress": "string",
        "amount": "number"
    }
    ```
- **Response**:
    - **201 Created**: 
    ```json
    {
        "message": "Contribution created successfully",
        "contribution": {
            "walletAddress": "string",
            "amount": "number",
            "createdAt": "date"
        }
    }
    ```
    - **500 Internal Server Error**: 
    ```json
    {
        "message": "Error creating contribution",
        "error": "error details"
    }
    ```

#### Get Contributions

- **GET** `/contributions`
- **Description**: Retrieve a list of all contributions.
- **Response**:
    - **200 OK**: 
    ```json
    [
        {
            "walletAddress": "string",
            "amount": "number",
            "createdAt": "date"
        },
        ...
    ]
    ```

### Users

#### Get Users

- **GET** `/users`
- **Description**: Retrieve a list of all users.
- **Response**:
    - **200 OK**: 
    ```json
    [
        {
            "walletAddress": "string",
            "createdAt": "date"
        },
        ...
    ]
    ```
