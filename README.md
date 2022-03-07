# Code Challenge - Survey

## Objective
Create a simple survey with the following survey type

```
type RequestBody = {
    name: string
    password: string
    birthday: string // ISO Format
    preferences : {
        techPref: "front end" | "back end" | "both"
        pizzaToppings: string[]
        timezone: string
    }
}
```

This application should be production ready and include the following
- Tests (Jest)
- Material UI
- API call for timezones
- Data modeling and app structure
- Good coding patterns
- State management
- Documentation including a well written readme

Bonus points for using Typescript, hooks, and functional components

## Description
This application features 
- ReactJs
- Functional components
- Typescript
- Modular design
- Material UI
- API call using fetch
- Jest
- Custom hooks
- Custom form validation hook
- Theming
- Custom components

## Installation


### `git clone https://github.com/bmkopp10/survey.git`

### `cd survey`

### `npm install`

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

