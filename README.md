# Angular JS with jwt authentication token and plugins mechanism

## Setup

`bower install && npm install`

## Run

`gulp watch serve`

To see gulp flow generated on deployment use : `gulp graph`

## Deploy code (production)

`gulp writeToProd`

> Files will be generated on `.one-gulp/prod`

## Test & Lint

> For the function tests with [protractor](http://angular.github.io/protractor), install `npm install -g protractor@2`, the install navigator dependencies Selenium with `webdriver-manager update`.

> Java needs to be installed for Selenium : `sudo apt-get install default-jdk`

`gulp lint`

`gulp test`

`gulp test --dev`

`webdriver-manager start && gulp protractor --baseUrl=http://localhost:12162 --seleniumAddress=http://localhost:4444/wd/hub`

## Docs

`gulp docs`, available on `/docs`
