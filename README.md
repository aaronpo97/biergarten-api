# The Biergarten API v2

## About

This is a 'revamped' version of my Biergarten app: <https://github.com/aaronpo97/biergarten-app>

I aim to rewrite the app using Postgres as my database rather than MongoDB as in the first version. I aim to only rewrite the server code with the aim of possibility of using this API for a mobile application sometime in the future.

This application uses Typescript with the Express framework in addition to TypeORM for the data service layer.

I am making this code public in the hopes that this content will be useful for anyone wanting to learn TypeORM, Typescript, or any other tools I use in this project.

## How to run this application

This `README` assumes that you have the current LTS version of Node.js (>=16.0), if that is not the case, go to <https://nodejs.org/en/> to install Node.js.

### Step 1

```bash
npm install
```

### Step 2

#### Developer mode

To run the application in `dev` mode:

```bash
npm run dev
```

#### Production mode

To run the application in `production` mode:

```bash
npm start
```

This will create a directory called `./dist` which contains the compiled Typescript code.
