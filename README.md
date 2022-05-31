# The Biergarten API v2

## About

This is a 'revamped' version of my [Biergarten App](https://github.com/aaronpo97/biergarten-app).

I am writing this app in an effort to continue learning about Typescript, Node, Express, and Postgres/TypeORM. The idea of writing a beer related app comes from my current job working in the retail operations of a brewery. It just so happens that I really enjoy beer as well!

I aim to rewrite the app using Postgres as my database rather than MongoDB as in the first version. I aim to only rewrite the server code with the aim of possibility of using this API for a mobile application sometime in the future.

This application uses Typescript with the Express framework in addition to TypeORM for the data service layer.

I am making this code public in the hopes that this content will be useful for anyone wanting to learn TypeORM, Typescript, or any other tools I use in this project. For those reading this code, I have annotated my files with JSDoc to describe exactly what I aim to do with each code snippet.

### Some beer terminology

In this app you will encounter various beer related terms. Here is a list of terms used in this app and their definitions.

#### ABV

[Alcohol by volume](https://en.wikipedia.org/wiki/Alcohol_by_volume) (abbreviated as ABV) is a standard measure of how much alcohol (ethanol) is contained in a given volume of an alcoholic beverage (expressed as a volume percent).

#### IBU

The [International Bitterness Units](https://en.wikipedia.org/wiki/Beer_measurement#Bitterness) scale, or IBU, is used to approximately quantify the bitterness of beer. This scale is not measured on the perceived bitterness of the beer, but rather the amount of a component of beer known as iso-alpha acids.

## How to run this application

This `README` assumes that you have the current LTS version of Node.js (>=16.0), if that is not the case, go follow the instructions on the [Node.js website](https://nodejs.org/en/), then proceed with the following instructions. It also assumes that you have a bash shell installed on your system.

### Step 1

To install all dependencies required by the app (both dev and production), run the following script in a terminal set to this directory.

```bash
npm install
```

### Step 2

#### Environment variables

In the same terminal, run the following script to define your development environment variables.

```bash
echo "
LOCAL_DB_CONNECTION_STRING=''
CLOUD_DB_CONNECTION_STRING=''

REFRESH_TOKEN_SECRET=''
ACCESS_TOKEN_SECRET=''

NODE_ENV='dev'
PORT=''
BASE_URL='http://localhost'
" > .env
```

- This will create a `.env` file to hold your environment variables.

##### Additional steps

- Input the credentials to your database, as well as the port you wish to host the app on.
- Generate a refresh token secret and an access token secret.
- I suggest using a password generator set to 64 characters for added security.

##### Example

```env
LOCAL_DB_CONNECTION_STRING='postgres://{user}:{password}@{hostname}:{port}/{database-name}'
CLOUD_DB_CONNECTION_STRING='postgres://{user}:{password}@{hostname}:{port}/{database-name}'

REFRESH_TOKEN_SECRET='this_is_a_bad_secret'
ACCESS_TOKEN_SECRET='tHiS_1s_a_B3ttr_s3crt'

NODE_ENV='dev'
PORT='8080'
BASE_URL='http://localhost'
```

### Step 3

### Seeding the database

#### Step 3.1

First run this command (you only need to do this once).

```bash
cp ./src/seed/data/seedDataExample.ts ./src/seed/data/seedData.ts
```

- This will create a file called `seedData.ts` by copying the file `seedDataExample.ts`.
- I have made my dataset private as I have not been given permission from breweries to make their data publicly available to this repo.
- Append your seed data as you see fit.

#### Step 3.2

Run the following command in your terminal:

```bash
npm run seed
```

- This will reset the database by clearing each column. It will add your data to the database.

### Step 4

Run the following scripts, depending on the application mode you wish to use.

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

- This will create a directory called `./dist` which contains the compiled Typescript code.
