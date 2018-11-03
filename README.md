# Random User API

## Objective:
* Create an API in Node.js/Express exposing 3 endpoints to GET and POST random user data.
* I should be able to make asynchronous requests from within the API to retrieve data initially from a 3rd party API ("https://randomuser.me/api").

#### User Data format
* The random user records are returned as an object. I am using the following fields in JSON format
  * {
      gender: 'foo',
      firstname: 'bar',
      city: 'baz',
      email: 'barfoo',
      cell: 'bazbar'
    }

## Endpoints:
#### GET '/users'
* When this endpoint is hit it triggers an Axios request to the above 3rd party API to retrieve 10 random user records and stores the records as objects within an array in memory. If the request was successful, all user records in memory will be sent back along with a status code 200

#### POST '/users'
* When this endpoint is hit it allows you to create a new user record using the format shown above. If the new record was successfully added to the user array in memory, you will receive the response { message: 'User successfully created!' } JSON response with status code 201. 

#### GET '/users/firstname/:firstname'
* When you hit the endpoint, you are able to search the available records currently in memory by first name. Replace :firstname with the name of the user you are looking for (not case sensitive), and if there is a user or users with that name you will be returned an array with all matching User records in JSON format with status code 200. If no such user exists, you will be returned { message: 'User not found! '} JSON response with status code 404.