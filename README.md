# Bandlabs - Imagegram

## By Andhana Utama

1. Base URL of backend project
    ```sh
    http://localhost:9000/api/v1
    ```

## Technologies Used

    1. Postgres DB on HEROKU
    2. Cloudinary for cloud storage
    3. Nodejs
    4. Typescript
    5. ExpressJS

## How to run Backend

1. Make sure you have nodeJS
2. install necessary packages:
    ```sh
    npm install
    ```
3. rename .env.example to .env:
    ```sh
    .env.example --> .env
    ```
4. change into these env values:

    ```sh
     APP_NAME="Bandlab - Andhana Utama"
     API_KEY=
     APP_KEY="j1un3TFo7WkosxyXBN3PI8wK2VUOhPhPJA0jRlfS72XD1JIYhqVmCK6RPXu1WlibCSZwIDAQABAoICAAgimuz"
     NODE_ENV="development"

     PORT=9000
     APP_LINK=http://localhost
    ```

5. Run this command to compile typescript to JS:
    ```sh
    npm run build
    ```
6. Run this command to run production mode:
    ```sh
    npm run start
    ```
7. Done! it will run on http://localhost:9000/api/v1

## API Documentations for Backend

```sh
https://documenter.getpostman.com/view/1357220/UzJMsbP4
```

## Routes List for Backend

1.  Register user (POST)
    ```sh
    http://localhost:9000/api/v1/users/register
    ```
2.  Login user (POST)
    ```sh
    http://localhost:9000/api/v1/users/login
    ```
3.  Profile user (GET)
    ```sh
    http://localhost:9000/api/v1/users/profile
    ```
4.  Submit content (POST)
    ```sh
    http://localhost:9000/api/v1/posts/submit
    ```
5.  Get all content (GET)
    ```sh
    http://localhost:9000/api/v1/posts/all
    ```
6.  Post comment (POST)
    ```sh
    http://localhost:9000/api/v1/comments/submit
    ```
7.  Delete comment (DELETE)
    ```sh
    http://localhost:9000/api/v1/comments/delete
    ```

## Contact

Twitter: Andhana Utama - [@magicwarms](https://twitter.com/magicwarms)<br>
Email: andhanautama@gmail.com<br>
LinkedIn: Andhana Utama - [Andhana Utama](https://www.linkedin.com/in/andhana-utama-4a2b1a130/)
