_This library is under development_

# Reclare

Declarative state management library for React built on top of the Context Api

## Simple example

## Philosophy

## Declarations

A declaration defines the reaction to a certain event under the conditions at the time of the event. It describes “what happened“, “what is the current situation” and “how to react to what happened under this situation”. At the time of the event, if the given situation holds, the reaction will take place.

Declarations are simple objects like below. `on` field takes in the event key, and defines what events the declaration will be triggered upon. You can input an array if you like the declaration to be triggered upon more than one event. It is also possible to declare multiple declarations with the same event key, they will end up being merged. This is particularly useful when you want to spread declarations over to multiple files.

```
{
  on: string or [string]
  situation: func -> bool (sync) or [func -> bool (sync)]
  reaction: func or [func]
  reactionElse: func or [func]

  // TODO
  onError: func or [func]
}
```

### Situation

A situation is a function / value that defines the condition when the declaration is triggered. This condition can depend on anything; the current state, time, route, location etc. Any value passed to the declaration through an event payload can also be used to define a condition. When the situation function returns `true` or a truthy value, that means the condition holds, otherwise, it doesn’t. If the situation is not a function, its truthy / falsy value will dictate if the condition holds or not. Omitting `situation` is equivalent to setting it to `true`, it will hold every time.

Situation functions will have `state` and `event` in their arguments. You can access the entire state and the event payload through them.

```
{
  // doesn't hold: falsy value
  situation: null

  // doesn't hold: falsy value
  situation: ''

  // holds: truthy value
  situation: 'a'

  // holds: true
  situation: true

  // holds: returns true
  situation: ({ state, event }) => true

  // holds if x is 3
  situation: ({ state, event }) => state.x === 3
}
```

**Multiple situations**

You can define multiple situations for a declaration. There are two ways of doing this: you can either input an array of situations, or you can use the `and`, `or` and `not` logical operators to build up your own custom logic. Inputting a situation array is equivalent to combining them by `and`.

```
{

  // below two examples are equivalent
  situation: [fn1, fn2, fn3],
  situation: () => fn1() && fn2() && fn3()

  // below two examples are equivalent
  situation: and(fn1, or(fn2, not(fn3)))
  situation: () => fn1() && (fn2() || !fn3())

  // example
  situation: [
    ({ state }) => state.count >= 0,
    ({ event }) => !event.prevent
  ]

  // example
  situation:
    and(
      ({ event }) => event.isValid,
      not(
        or(
          ({ state }) => !state.user,
          ({ state }) => !state.user.isAdmin,
        )
      ),
    )
}
```

**Asynchronousy in situations**

Situation functions has to be synchronous. If you should need to use an asynchronous condition _(ie. the condition is “weather is sunny” and you need to fetch weather data from an api)_, then you should orchestrate this using multiple declarations; first one fetching the data, saving weather data to state, and second one reading from the state.

If you declare an asynchronous situation function, it will **not** be awaited during evaluation. If it returns `undefined` when executed, it will be interpreted as the condition doesn’t hold since it is a falsy value. If it returns a promise, it will evaluate to true (as it is a truthy value) and it will always hold.

```
// THESE ARE WRONG
{
  // doesn't hold: returns undefined, evaluates to false
  situation: () => {
    fetch('/api').then(res => true)
  }

  // holds: returns a promise, evaluates to a true
  situation: () => new Promise(resolve => {
    setTimeout(() => resolve(false), 1000)
  })
}
```

### Reaction // todo

## Broadcasting Events // todo

## Subscription // todo

## Rules (todo: what to name this section)

Event keys should **define the event** _(ie. what happened)_, not **how to react** to what happened. For example, when a login button is clicked, the invocation key should be something like _login_button_clicked_, not _initiate_login_. Naming has no effect on how Reclare works, but this will force you to think declaratively.

Asynchronousy should be handled within followup declarations. For example, a declaration that makes a request shouldn’t handle how to react to the response. Instead it should broadcast _request_success_ or _request_fail_ events. Other declarations should be created to handle these cases.
