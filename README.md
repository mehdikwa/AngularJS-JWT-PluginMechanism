# Angular JS with jwt authentication token and plugins mechanism

## Setup

`bower install && npm install`

## Run

`gulp watch serve`

Pour voir tous les flux gérés par la lancement dev ou la mise en production de gulp : `gulp graph`

## Deploy code (production)

`gulp writeToProd`

> Fichiers générés dans `.one-gulp/prod`

## Test & Lint

> Pour les tests fonctionnels avec [protractor](http://angular.github.io/protractor), installez `npm install -g protractor@2`, puis installez les dépendances du navigateur Selenium avec `webdriver-manager update`.

> Concernant Selenium, il faut avoir Java d'installé : `sudo apt-get install default-jdk`

`gulp lint`

`gulp test`

`gulp test --dev`

`webdriver-manager start && gulp protractor --baseUrl=http://localhost:12162 --seleniumAddress=http://localhost:4444/wd/hub`

## Docs

`gulp docs`, disponible sur `/docs`
