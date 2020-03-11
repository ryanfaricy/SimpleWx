# SimpleWx

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 9.0.5.

Architecture:

- src/app/google-places
    - originally intended to implement a City autocomplete text box, but was unable to get this working in a reasonable amount of time
- src/app/weather
    - this component contains the city search form and the list view
- src/app/weather-details
    - this component displays the weather tiles in the list view
    - also contains the details dialog
- src/app/weather-table
    - this was going to be an alternative to the list view, in table form, but decided the list view created looked better in the amount of time I had
- src/environments/environment.ts
    - contains the OWM URL and API key
    
NPM install may need to be used to install the necessary packages required to run this application.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
