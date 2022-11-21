
# About the project

An automation testing framework for wave-trial application using Cypress.

## Documentation

[Requirements](https://drive.google.com/file/d/1kAWLISD6mtOEM6BNzXuq7frbym-2Df_B/view?usp=share_link)

[Test Scenarios](https://docs.google.com/spreadsheets/d/1UpN8XXuDIobgw9o0bAZu_seD8tl0Ty9Rlp5mZDKB778/edit?usp=share_link) 


## Project Structure

```
├───.github
│   └───workflows
├───cypress
│   ├───downloads
│   ├───e2e
│   │   ├───bynder
│   │   └───Pages
│   ├───fixtures
│   ├───reports
│   │   └───html
│   ├───screenshots
│   │   └───login.cy.js
│   ├───support
│   └───videos
├───node_modules
├───cypresss.config.js
├───Dockerfile
└───package.json
```
## Getting Started

### Prerequisites
NodeJS
### Installation
1. Clone the repo
```
https://github.com/deekochar92/cypress_automation.git
```
2. Install NPM packages
```
$ npm install
```

## Running Tests

```
npm run test
```


## Docker Setup

The tests can also be executed in a docker container without having to install all the dependencies.

### Installing Docker

Download and install docker engine from this url : https://docs.docker.com/engine/install/

### Getting Docker Image
To run tests, you can build your own docker image from Dockerfile or pull the image from docker hub.

Building your own Docker image:
```
docker build -t <image_name>:<tag_name>
```
Verify that the built image is available by running:
```
docker images 
```
To run tests, run the following command
```
docker run <imagename>:<tagname>
```
