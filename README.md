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

<h4 align="center">Declarative State and Logic Management</h4>

<p align="center">
  <a href="#what-is-reclare">Introduction</a> •
  <a href="#key-features">Key Features</a> •
  <a href="#basic-example">Basic Example</a> •
  <a href="#basic-example">Documentation</a> •
  <a href="#contribution">Feedback</a> •
  <a href="#contribution">Contribution</a> •
</p>


### What is Reclare ?

Reclare is a lightweight library to manage the application state alongside business logic, without compromising from the predictability of the state. It is inspired by [Redux](https://redux.js.org/) and [the Elm architecture](https://guide.elm-lang.org/architecture/) and includes many of the familiar concepts.


### Key Features

* Manage **state** and **logic** together
* Predictable, immutable state management
* Handle requests / side effects
* Built-in way to modularise your code
* For all frameworks - [offical middleware for React](https://github.com/reclarejs/react-reclare)
* Simple to create and use custom middlewares
* Easy to install, minimal configuration
* Easy-to-grasp concepts


### Basic Example

[View on JSFiddle](https://jsfiddle.net/oguzgelal/r89vzhuq/)

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

Upon the broadcast of `increment`, the first declaration will be invoked. It will increment the counter and log the updated number. `decrement` event hits two declarations. First one only invokes when the counter is greater than zero and decrements the counter. Second one invokes when counter is zero, and alerts the error message.

Broadcasting these events would look something like this:

```javascript
<Button value="+" onClick={() => broadcast('increment')} />
<Button value="-" onClick={() => broadcast('decrement')} />
```


### Documentation

The documentation is still under construction, it still has some missing parts. My apologies for that. I will try to complete it as soon as possible.

[Click here for the documentation](https://docs.reclare.io)


### Feedback

What do you think about Reclare? Do you have any ideas? I would love to hear them, and kind of feedback would be much appreciated. You can [email me](mailto:o.gelal77@gmail.com) or [contact me](https://oguzgelal.com) some other way.


### Contribution

The contribution guideline for Reclare is not ready at the time being, but if you love this project and want to help, please [contact me](mailto:o.gelal77@gmail.com).
