## Motivation

Early in the days of [front-end development](https://en.wikipedia.org/wiki/Front-end_web_development), people were building user interfaces with plain HTML and CSS, and manipulating the DOM with either vanilla javascript or with the all-famous jQuery. It was reasonable back then - as front-end applications were simple and not as data-driven. But the requirements grew over the years; front-end became responsible for more than just displaying the data that was handed over, it was given the responsibility of fetching and handling the data all by itself. Manipulating the DOM quickly lost its feasibility.

Modern front-end frameworks [solved this problem](https://medium.com/dailyjs/the-deepest-reason-why-modern-javascript-frameworks-exist-933b86ebc445) by abstracting away DOM manipulation. They handled it with data bindings or by virtualising the DOM; and with complimentary change detection mechanisms, they had the DOM reflect the underlying state of the application. These frameworks made it possible to build front-end applications without worrying about how DOM should be updated, but managing the state was still left on developers plate.

Then came the state management libraries. [Redux](https://redux.js.org) pioneered the way of standardizing [event-sourcing](https://martinfowler.com/eaaDev/EventSourcing.html) like transactional state management in front-end development; with an immutable, read-only, single-source-of-truth style state. It restricted how and when the application state can update, which improved maintainabililty and robustness of applications as they scale. However Redux is a low-level state container than a complete library, it solves the very problem of state management and exposes no further opinions. [Reclare](https://github.com/reclarejs/reclare) is a Redux-inspired library that attempts to solve some of the problems that were left in the dark, without comprimising from the principles of the underlying idea.

### Logic in State Management

Modern state management libraries focuses on one thing and one thing only, managing the application state; the logic behind the scenes is [usually overlooked](http://krasimirtsonev.com/blog/article/managing-state-in-javascript-with-state-machines-stent). It makes sense in the context of state management as it is today, because libraries tends to solve one problem at a time; however, **state management and business logic should not be seen as two different entities**. Granted there needs to be a separation between the two, as the impurities and side effects of logic should be kept away from management of the state. But functionally, they belong to each other, so they should coexist and be operated under the same command channel. **This approach brings a similar predictability to logic that it does to the state**, making it easier to reason with, follow, understand and test the code. There was a need for a library that will dictate this lifecycle; handle logic and manage the state together but separately, maintaining all the best practices of state management that we've all seen by now. This is where Reclare steps in.

### Code Structure and Fragmentation

On a typical front-end codebase, there are many different types of "entities" that needs to be organised. For instance, in a typical react + redux + redux-saga codebase you would probably have `containers`, `components`, `actions`, `reducers`, `types`, `selectors`, `sagas`, `services` and possibly others depending on the selection of libraries. [Dan Abramov](https://github.com/gaearon) mentions in his article [You might not need Redux](https://medium.com/@dan_abramov/you-might-not-need-redux-be46360cf367):

> People often choose Redux before they need it. “What if our app doesn’t scale without it?” Later, developers frown at the indirection Redux introduced to their code. “Why do I have to touch three files to get a simple feature working?” Why indeed!

And he is right, you shouldn't have to touch three different files to work on a single functionality. In fact, **code that functionally belong together should not be fragmented into different entities, and should be grouped together**.

Reclare has a two-step solution attempt to solve this issue. First step is the declarations: **declarations are bundles that holds state updater functions and logic together**. Given that they are organised under events, it is ensured that a reducer and a reaction will functionally be relevant. For example, a declarations for the event `login_response_success` would have a reducer that saves user data to the state, and a reaction that triggers a success message and changes the route. Both the reducer and reaction belongs to the login process, thus they reside and work together.

Second step is the **duck file** approach. [Ducks](https://github.com/erikras/ducks-modular-redux) is a proposal by [Erik Rasmussen](https://github.com/erikras) to bundle the shattered pieces of redux together into a single file as an isolated module. Reclare follows this pattern in its own way, allows you to bundle your declarations together into a single file. More over, it supports composition of ducks, so you can have logical parent-child relationships between modules. Duck files can contain, and even export other things such as constants, selectors etc. It is a simple yet handy way to divide and group your code into logical units.

### Declarativeness

Reclare orchestrates your logic and state together under the same command channel. This opens doors to a wide range of possibilities, such as the ability to take make use of the declarativeness when implementing your logic. The benefits of this is the ease of testing and reasoning with the code. I will try to explain this better with a simple login scenario:

The login form:

```javascript
<form onSubmit={() => broadcast('login_submitted', {
		email: this.state.email,
		password: this.state.password
	})}
>
 ...
 <Button ... isLoading={this.props.loading.login} />
</form>
```


Ducks file for login:

```javascript
{
  on: 'login_submitted',
  situation: ({ event }) => isValid(event.email, event.password),
  reaction: ({ event }) => broadcast('on_request', {
    type: 'login',
    path: '/login',
    params: { ...event }
  })
},
{
  on: 'request_success',
  situation: ({ event }) => event.type === 'login',
  reducer: ({ state, event }) => ({ ...state, user: event.user }),
  reaction: () => broadcast('on_route_change', { to: 'dashboard' })
},
{
  on: 'request_fail',
  situation: ({ event }) => event.type === 'login',
  reaction: ({ event }) => alert(`Failed: ${event.message}`)
}
```

Duck files for request:

```javascript
{
  on: 'on_request',
  reducer: ({ state, event }) => ({
    ...state,
    loading: { [event.type]: true }
  }),
  reaction: ({ event }) => {
    api(event.path, event.params)
      .then(res) => broadcast('request_success', res)
      .catch(err) => broadcast('request_fail', err)
      .finally() => broadcast('request_resolved', event)
  }
},
{
  on: 'request_resolved',
  reducer: ({ state, event }) => ({
    ...state,
    loading: { [event.type]: false }
  }),
}
```

### Flexibility

Since
