# jest-apex-test-runner

> Proof of concept for running Salesforce Apex tests using Jest

[See the blog post that goes with this repository!](https://daniel-vu.com/building-custom-jest-runner-for-salesforce-apex-tests)

## Why?

I recently moved into my first role Salesforce engineering role. Prior to working in Salesforce, I was primarily working
with JavaScript. I feel in love with that ecosystem and I felt that a lot of the tooling in that space. Moving into 
Salesforce has been an interesting transition, partly because there really isn't as much tooling as there is in the 
JavaScript ecosystem.

One of the tools that I loved and missed was [Jest](https://jestjs.io/). It's a testing framework primarily for 
JavaScript projects. Salesforce developers might be familiar with it if they get to work with Lightning Web Components.
But some of the great features of Jest aren't necessarily tied to the fact that you can write JavaScript tests with it.
The things I was interested the most in were...

- Running tests in watch mode: As soon as I change my code, I want my tests to run immediately. I don't want to have to 
press any buttons, it should happen automatically. This reduces the amount of time between feedback, allowing me to 
iterate through my code changes rapidly. It also lets me know if I broke anything by changing that single line of code.
- Easily selecting which tests I want to run over and over: The developer console UI is a little clunky. VS Code with 
the Salesforce Extension Pack are a little better. But with Jest, the built-in file filtering and navigation allow you to
fly through tests you want to run!

This repository is just a proof of concept; when you change the code in a test, it reruns the test when you run Jest in 
watch mode. It doesn't take into account when you change your actual org code. But I feel like it's interesting to 
experiment with what the experience could look like.