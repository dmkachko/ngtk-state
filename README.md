# NgtkState

A little typesafe bycicle to ride across the state management tasks in Angular.
Use it whenever it is appropriate to avoid using the whole another framework-size layer like NgRx or some React based system.












# Todo

* Chaining actions : should be able to run another action on successfully executed one (effect?)
* Handle exceptions in reducers : should be able to run another action on it or execute an effect
* Asynchronous actions: a set of actions subsequently running the others on success, failure, complete and ability to cancel
* Default reset state

---

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 13.3.5.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
