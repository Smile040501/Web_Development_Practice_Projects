# REST API Template

My template for building REST APIs using Node.js & MongoDB with pre-built MVC architecture, security mechanisms, utilities, middleware, models, and webpack bundling config.

## Table of Contents

- [REST API Template](#rest-api-template)
  - [Table of Contents](#table-of-contents)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Start building your REST API](#start-building-your-rest-api)
  - [Useful Scripts for Local Development](#useful-scripts-for-local-development)
    - [`npm run start:dev`](#npm-run-startdev)
    - [`npm run start:server`](#npm-run-startserver)
    - [`npm run build:prod`](#npm-run-buildprod)
  - [License](#license)
  - [Author](#author)

## Prerequisites

This project requires [NodeJS](http://nodejs.org/ "NodeJS") (version 8 or later) and [NPM](https://npmjs.org/ "NPM").

To make sure you have them available on your machine,
try running the following command.

```sh
$ npm -v
7.20.3

$ node -v
v14.17.4
```

## Installation

**BEFORE YOU INSTALL :** Please read the [Prerequisites](#prerequisites).

Start with cloning this repo on your local machine, copying this template folder to destination folder and installing dependencies.

```sh
$ git clone git@github.com:Smile040501/Web_Development_Practice_Projects.git

$ cp -r Web_Development_Practice_Projects/Tools/REST_API_Template/ <destination_path>

$ cd <destination_path>/REST_API_Template/

$ npm install
```

## Start building your REST API

Make sure to fill the values of keys in **nodemon.json** file.\
You can get `DB_URI` from [MongoDB Atlas](https://account.mongodb.com/account/login) by creating a cluster in a project.

## Useful Scripts for Local Development

In the project directory, you can run:

### `npm run start:dev`

Runs the app in the development mode.\
You can make request to [http://localhost:8000](http://localhost:8000/)\
It will bundle the app using [webpack](https://webpack.js.org/) to `build` folder and serve it using [nodemon](https://nodemon.io/).\
It will re-bundle whenever you make edits to any of the development file.

### `npm run start:server`

Will serve the app using [nodemon](https://nodemon.io/).\
Make sure the app was build before webpack at least once and `build` folder exists.

### `npm run build:prod`

Builds the app for production to the `build` folder.\
It correctly bundles the app in production mode and optimizes the build for the best performance.

The build is minified.\
Your app is ready to be deployed!

## License

[MIT](LICENSE)

## Author

<a href="https://github.com/Smile040501">
    <img src="https://avatars.githubusercontent.com/u/62458127?v=4?s=150" width="150px" alt="Mayank Singla" style="border-radius:7px"/>
</a>

**Mayank Singla**

-   [**GitHub**](https://github.com/Smile040501)
-   [**LinkedIn**](https://www.linkedin.com/in/mayank-singla-001pt)
