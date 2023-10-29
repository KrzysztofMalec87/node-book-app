# book app

## Introduction
This app will allow to manage your books list in a safe way with features like:
* User Authentication
* List Your Books
* Add New Titles
* Remove Books
* Authorization System: only authorized users can make changes to their collections.

## Getting Started:
Follow the instructions below to set up the app locally.

To work with that app you'll need Node.js with minimal version of 16, and Docker with compose.

* Node.js:
`node v16.xx.x`
`npm v8.xx.x`
* Docker:
Recomended docker desktop that allready have compose build in, you can download it from:
https://www.docker.com/

### Project init:
If you have Node and Docker we can setup our project.
1. Go to the root project dir and copy `.env-example` file and rename it to `.env`, it allready have pro-filled values.
2. In that same path write command `docker compose up -d`, that will run our docker container that will have our database.
3. Let install project, to do that in the same path type `npm ci` in shell.

Now our project is ready to go and we can run it by typing `npm run dev`, project (endpoints) will be available on: http://localhost:3000
(you can change port in `.env` file)

### Routes:
`Login:`  
path: /api/v1/login  
type: POST  
payload:  
  ```JavaScript
    {
        username: string,
        password: string,
    }
  ```

`Register:`  
path: /api/v1/register  
type: POST  
payload:  
  ```JavaScript
    {
        username: string,
        password: string,
    }
  ```

`Books list:`  
path: /api/v1/books  
type: GET  

`Add book:`  
path: /api/v1/books/add  
type: POST  
payload:  
  ```JavaScript
    {
        name: string,
        description: string,
    }
  ```

`Remove book:`  
path: /api/v1/books/remove  
type: POST  
payload:  
  ```JavaScript
    {
        bookId: string,
    }
  ```

`Regenerate token:`  
path: /api/v1/regenerate-token  
type: POST  
payload:  
  ```JavaScript
    {
        refreshToken: string,
    }
  ```