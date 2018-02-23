

## Overview
This simple app can help you to choose a color (from autocomplete component) and after submitting, see the result as half-transparent `background-color` set for the root element.
Color dataset is fetched from external source. When you start enter some letters (min. 2 chars), you see a list of colors with entered substring. 

## I want try it out!

All you need to do to see and try it is just:
````javascript
yarn install
yarn start
````

or alternatively:
````javascript
npm install
npm start
````

Simple as you see.


## Some implementation explanations
- The app war written based on [create-react-app](https://github.com/facebook/create-react-app) boilerplate.
- Code written in React with help of [Webpack](https://webpack.js.org/) module bunder,  [axios](https://github.com/axios/axios) for HTTP requests, styled with awesome [styled-components](https://www.styled-components.com) <3
- UI components are self-written, which means, maybe they're not so pretty but at least I know exactly what's going on under the hood ;-)
- Code is good tested, if you don't believe, type `yarn test --coverage`