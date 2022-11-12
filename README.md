# UoM Bank - A simple 3-tier app

## Running
To run the project you can use docker-compose.
Simply run docker-compose up and go to localhost:80

## Endpoints

The endpoints that the application exposes to the outside world (tier 1)
- GET /user/<user_id>/account: Get user's balance
- PATCH /user/<user_id>/account/deposit: Deposit amount specified in request's body to the user's account
- PATCH /user/<user_id>/account/withdraw: Withdraw amount specified in request's body from the user's account

These endpoints are only here for developing purposes the should be removed in the final application
- POST /create: Create a new account with 0 balance
- GET /users: Return a list of all user ids