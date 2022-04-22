# For The Record Code Test

This project is created by [Vue-CLI](https://cli.vuejs.org/) version2.6.11 and Tailwindcss version2.2.17

Please see the complie version at

## Project setup

Before we move on, please ensure you have install node, npm and git.

`npm install` : this command will install all tools that we need to develop this application

`npm run serve ` : this command will build your project with Webpack and serve it with local http-server

`npm build` : this will bundle everythingin into ./dist fold which is ready to be deployed through any static file server.

## Part 1: Writing the application

The application should accept an ongoing series of user supplied numbers as inputs, and output notifications when certain conditions are met. It should operate as follows:

1. On startup, the program will prompt the user for the number of seconds (X) between outputting the frequency of each number to the screen.
2. Every X seconds the program will display, in frequency descending order, the list of numbers and their frequency.
3. If the user enters 'halt' the timer should pause.
4. If the user enters 'resume' the timer should resume.
5. If the user enters a number that is one of the first 1000 numbers in the Fibonacci sequence, the system should alert "FIB"
6. If the user enters 'quit', the application should output the numbers and their frequency, a
   farewell message, and finally terminate.

## Part 2: Changes to your application

1. You have a new requirement to implement for your application: its logic should stay exactly the same but it will need to have a different user interface (e.g. if you wrote a web app, a different UI may be a REPL).

Please describe how you would go about implementing this new UI in your application? Would you need to restructure your solution in any way?

> The app should not be restructured if the logic stays the same since the solution is designed to executed each action by independent function. It is also followed the auto-generated structure by Vue. Each component is defined as a single file in the ./components folder. Therefore, if a new UI need to be implemented, a new vue file shall be created in ./components folder and named in PascalCase.
> In terms of state of the app, they are storing in App.vue file and passing to component files with explicit props declaration. However, when the application grows bigger, Vuex, a state management, is recommended. In this way, multiple components would be much more easier to share common states.

3. What did you think about this coding test - is there anything you’d suggest in order to improve it?
