# The Biergarten API v2

## About

This is a 'revamped' version of my [Biergarten App](https://github.com/aaronpo97/biergarten-app).

I am writing this app in an effort to continue learning about Typescript, Node, Express, and SQL. The idea of writing a beer related app comes from my current job working in the retail operations of a brewery. I also just so happen to really enjoy beer as well!

I aim to rewrite the app using Postgres as my database rather than MongoDB as in the first version. I aim to only rewrite the server code with the aim of possibility of using this API for a mobile application sometime in the future.

This application uses Typescript with the Express framework in addition to TypeORM for the data service layer.

I am making this code public in the hopes that this content will be useful for anyone wanting to learn TypeORM, Typescript, or any other tools I use in this project.

### Some beer terminology

In this app you will encounter various beer related terms. Here is a list of terms used in this app and their definitions.

#### ABV

[Alcohol by volume](https://en.wikipedia.org/wiki/Alcohol_by_volume) (abbreviated as ABV) is a standard measure of how much alcohol (ethanol) is contained in a given volume of an alcoholic beverage (expressed as a volume percent).


#### IBU

The [International Bitterness Units](https://en.wikipedia.org/wiki/Beer_measurement#Bitterness) scale, or IBU, is used to approximately quantify the bitterness of beer. This scale is not measured on the perceived bitterness of the beer, but rather the amount of a component of beer known as iso-alpha acids.


## How to run this application

This `README` assumes that you have the current LTS version of Node.js (>=16.0), if that is not the case, go to <https://nodejs.org/en/> to install Node.js, then proceed with the following instructions.

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
