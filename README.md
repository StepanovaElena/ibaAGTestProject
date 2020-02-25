# Test Project for iba AG

A small application as a potential part of a big prodject with admin panel.

![Project illustration](https://github.com/StepanovaElena/ibaAGTestProject/blob/master/08uM5tinj9.gif)


## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

The project uses Firebase Realtime DataBase as beckend part. 

First of all you should create your project on https://console.firebase.google.com/ using step-by-step instructions, and get your own API Key. After that create your own database in the Firebase project. 

In Authentication part configure access by address and password. Add user in Uses part.

### Installing

Clone project from github

```
git clone https://github.com/StepanovaElena/ibaAGTestProject.git
```

Go to the project folder and run this command in the consile to install all necessary packeges.

```
\path\to\the\project>npm install
```

Insert your Firebase APIKey and your Realtime DataBase Url in envirement.ts and envirement.prod.ts in enviroments folder.

```
export const environment: Environment = {
  ...
  apiKey: '<here your API Key>',
  fbDbUrl: '<here your fbDbUrl>'
};
```

## Project structure

```
.
|-- app
|   |-- error-page
|   |-- group-create
|   |-- group-update
|   |-- login-page
|   |-- shared
|       |-- components
|       |-- pipes
|       |-- resolvers
|       |-- servises
|       |-- validators
|       `-- auth.interceptor.ts
|   |-- user-create
|   |-- user-page
|   |-- user-update
|   |-- app.component.css
|   |-- app.component.html
|   |-- app.component.spec.ts
|   |-- app.component.ts
|   `-- app.module.ts
|-- assets
|   `--icons
|-- environments
|   |-- environment.prod.ts
|   `-- environment.ts
```

app/shared - contains the basic lay-out component, custom checkbox.component, alert.component, all services, custom validators, pipes, resolvers and interceptors.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Deployment

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

If you want to deploy this project with Firebase Hosting, then you should follow instructions in Hosting part.

## Built With

* [Angular](http://https://angular.io//) - The project was generated with Angular CLI version 8.0.0.
* [Firebase](https://console.firebase.google.com) - The project Backend part

## Authors

**Elena Stepanova** 
