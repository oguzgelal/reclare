<h1 align="center" style="font-size: 45px; font-weight: bolder;">
  <a
    href="https://github.com/reclarejs/reclare"><img src="https://user-images.githubusercontent.com/2817993/40689568-07d04312-63a3-11e8-8795-5d83f162c9bd.png" alt="Reclare" width="200">
  </a>
  <div>
    Reclare
  </div>
</h1>

<p align="center">
  <a href="https://travis-ci.org/reclarejs/reclare">
    <img src="https://travis-ci.org/reclarejs/reclare.svg?branch=master"
         alt="Travis">
  </a>
  <a href="https://coveralls.io/github/reclarejs/reclare?branch=master">
    <img src="https://coveralls.io/repos/github/reclarejs/reclare/badge.svg?branch=master">
  </a>
</p>

<h4 align="center">Declarative state and logic management for modern Javascript applications</h4>

<p align="center">
  <a href="#introduction">Introduction</a> •
  <a href="#basic-example">Basic Example</a> •
  <a href="#key-features">Key Features</a> •
  <a href="https://docs.reclare.io">Documentation</a> •
  <a href="#contribution">Feedback</a> •
  <a href="#contribution">Contribution</a> •
</p>


## Introduction

Reclare is a lightweight library to manage the application state alongside business logic, without comprimising from predictability of the state. It is inspired by [Redux](https://redux.js.org/) and [the Elm architecture](https://guide.elm-lang.org/architecture/), and includes many of the familiar concepts.

With Reclare, your **reducers** (state updater functions) and **reactions** (logic implementations) reside side by side under **declarations**, which gets invoked on one or many events that can be **broadcasted** from anywhere in your application. They are **situation aware**, and will only be invoked if the situation at the time of the event holds the given criteria. Declarations allows a functionality-first organisation of logic and state management; and with the **ducks files**, they can be grouped into logical units.


## Basic Example

Below is an example of what declarations would look like in the context of a simple counter implementation with one simple rule: the counter cannot go below zero: 

```javascript
{
  on: 'increment',
  reducer: ({ state }) => ({ ...state, counter: state.counter + 1 })
  reaction: ({ state }) => console.log(`Incremented to ${state.counter}`)
},
{
  on: 'decrement',
  situation: ({ state }) => state.counter > 0,
  reducer: ({ state }) => ({ ...state, counter: state.counter - 1 }),
  reaction: ({ state }) => console.log(`Decremented to ${state.counter}`)
},
{
  on: 'decrement',
  situation: ({ state }) => state.counter <= 0,
  reaction: () => alert('Counter already at zero')
}

```

Upon the broadcast of `increment`, the first declaration will be invoked, which will increment the counter on the reducer, and log the updated number on the reaction.

The `decrement` event hits two declarations, first one requires the counter to be greater than zero. It will only be invoked if the situation function returns a true (or a truthy) value, or is true / truthy itself; otherwise, its reaction and reducer will not be executed. If it is the case that the counter is at zero, the second declaration will be invoked, which will fire an alert.

And broadcasting these events would look something like this:

```javascript
<Button value="+" onClick={() => broadcast('increment')} />
<Button value="-" onClick={() => broadcast('decrement')} />
```


## Key Features

* A powerful declaration api to manage your state and business logic
* Predictable, immutable state management
* Built-in ability to handle effects
* Built-in way to divide your code into logical units
* Works with all modern front-end libraries - an [offical middleware for React](https://github.com/reclarejs/react-reclare)
* Simple to create and use custom middlewares
* Gradual learning curve, easy-to-grasp concepts
* Easy to install, minimal configuration


## Feedback

What do you think about Reclare ? Do you have any ideas ? I would love to hear them, and kind of feedback would be much appreciated. You can [email me](mailto:o.gelal77@gmail.com) or [contact me](https://oguzgelal.com) some other way.


## Contribution

The contribution guideline for Reclare is not ready at the time being, but if you love this project and want to help, please [contact me](mailto:o.gelal77@gmail.com).