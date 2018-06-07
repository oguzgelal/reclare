<h1 align="center" style="font-size: 45px; font-weight: bolder;">
  <a
    href="https://github.com/reclarejs/reclare"><img src="https://user-images.githubusercontent.com/2817993/40689568-07d04312-63a3-11e8-8795-5d83f162c9bd.png" alt="Reclare" width="200">
  </a>
  <div>
    Reclare
  </div>
</h1>

<h4 align="center">Declarative state and logic management for modern Javascript applications</h4>

<p align="center">
  <a href="https://travis-ci.org/reclarejs/reclare">
    <img src="https://travis-ci.org/reclarejs/reclare.svg?branch=master"
         alt="Travis">
  </a>
  <a href="https://coveralls.io/github/reclarejs/reclare?branch=master">
    <img src="https://coveralls.io/repos/github/reclarejs/reclare/badge.svg?branch=master">
  </a>
</p>

<p align="center">
  <a href="#introduction">Introduction</a> •
  <a href="#key-features">Key Features</a> •
  <a href="#design-goals">Design Goals</a> •
  <a href="#basic-usage">Basic Usage</a> •
  <a href="#credits">Docs</a> •
  <a href="#related">Contribution</a> •
  <a href="#license">License</a>
</p>

## Introduction

Reclare is a lightweight library to help you manage your application state alongside your application logic, without comprimising from immutability and predictability of your state. Your reducers and logical implementations resides side by side under what we call "declarations", and they get invoked over the same event broadcast channel. Reclare is inspired by [Redux](https://redux.js.org/) and [the Elm architecture](https://guide.elm-lang.org/architecture/), and includes many of the familiar concepts.

## Key Features

* A powerful multi-purpose Declarations Api to manage your state and logic
* Predictable state management
* Ability to handle effects without needing a middleware
* Built-in way to divide your code into logical units
* Works with all modern front-end libraries - offical middleware for React
* Dead simple to build and use custom middlewares
* Gradual learning curve - super easy to grasp concepts

## Design Goals

* Strictly decoupling business logic from the views
* Making views stateless pure functions
* Refraining from imperativeness whenever possible
