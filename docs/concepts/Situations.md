## Situations

Situations (situational conditions) are functions that can be used to describe the situation in which the declaration should invoke. For example, the situation function below describes a situation where the counter is greater than zero, so the declaration will only be invoked if that situational condition holds.

```javascript
{
  on: 'decrement',
  situation: ({ state }) => state.counter > 0,
  reducer: ({ ... }) => /* return new state */
  reaction: ({ ... }) => /* do something */
}
```

They receive an object as a parameter that holds the current state (`state`) and the event payload (`event`). On subscription declarations, they also receive the previous state (`prevState`), and the has change utility function (`hasChange`). See [declarations](./Declarations.md) for more details.

```javascript
createContext({
  
  // you can access to the state and the event payload 
  onEvent: [{
    on: 'event',
    situation: ({ state, event }) => something(state)
  }],

  // you can access the event payload, previous version 
  // and the current versions of the state. hasChange 
  // function is also accessible like so
  onStateChange: [{
    situation: ({ state, prevState, event, hasChange, }) =>
      hasChange('a.b.c')
  }]
})
```

The condition holds when situation function returns true or a truthy value. If the situation is not a function, its truthy / falsy value will dictate if the condition holds or not. Omitting situation is equivalent to setting it to true, it will hold every time.

```javascript
{
  // doesn't hold: falsy value
  situation: null;

  // doesn't hold: falsy value
  situation: '';

  // holds: truthy value
  situation: 'a';

  // holds: true
  situation: true;

  // holds: returns true
  situation: ({ state, event }) => true;

  // holds if x is 3
  situation: ({ state, event }) => state.x === 3;
}
```

### Multiple situations

You can define multiple situations for a declaration. There are two ways of doing this: you can either input an array of situations, or you can use the `and`, `or` and `not` logical operators to build up your own custom logic. Inputting a situation array is equivalent to combining them by and.

```javascript
import { and, or, not } from 'reclare';

...

// below two are equivalent
situation: [fn1, fn2, fn3],
situation: () => fn1() && fn2() && fn3()

// below two are equivalent
situation: and(fn1, or(fn2, not(fn3)))
situation: () => fn1() && (fn2() || !fn3())

// example
situation: [
  ({ state }) => state.count >= 0,
  ({ event }) => !event.preventDecrement
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
```

### Asynchronousy in situations

Situations has to be synchronous functions. If you should need an asynchronous condition *(for example, the condition would be “weather is sunny” and you need to fetch weather data from an api)*, then you should orchestrate this using multiple declarations, first one fetching data and broadcasting an event with the data attached to its payload for the next one to consume.

If you declare an asynchronous situation function, it will not be awaited during its evaluation. If it returns undefined when executed, it will be interpreted as the condition doesn’t hold since it is a falsy value. If it returns a promise, it will evaluate to true (as it is a truthy value) and it will always hold.

```javascript
// THESE ARE WRONG
{
  // doesn't hold: returns undefined, evaluates to false
  situation: () => {
    fetch('/api').then(res => true);
  };

  // holds: returns a promise, evaluates to a true
  situation: () =>
    new Promise(resolve => {
      setTimeout(() => resolve(false), 1000);
    });
}
```

### Why are situations necessary ?

There have been some discussions on whether situations are necessary or not. One might argue that it adds some complexity to declarations, and it would be simpler to check the condition in the reducers / reactions. However, situations are more than just syntactic sugars.

The reason why situations must exist is related to the way Reclare orchestrates the declaration functions. When an event is broadcasted, Reclare makes sure that all the situation functions of all triggered declarations are evaluated against the same situation, that is, the situation at the exact moment of the broadcast. In another word, all situation functions will certainly receive the state at the time of the broadcast. This is only possible when situation function are not embedded inside reactions / reducers and are provided separately to the declaration. Consider the decrement counter example that the counter can't go below zero:

```javascript
{
  on: 'decrement',
  situation: ({ state }) => state.counter > 0,
  reducer: ({ state }) => ({ ...state, counter: state.counter - 1 })
},
{
  on: 'decrement',
  situation: ({ state }) => state.counter === 0,
  reaction: () => alert('counter at zero')
}
```

Let's say `decrement` event is broadcasted when the state is `{ counter: 1 }`. Two of the declarations above will get triggered, and Reclare will make sure both of their situation functions receives the state `{ counter: 1 }`. First one will hold, its reducer will be queued. Second one will not hold, and it will not be invoked. Then the queued reducer will executed and transform the state into `{ state: 0 }`. Now let's see what happens if we checked the conditions imperatively:

```javascript
// bad example, don't do this
{
  on: 'decrement',
  reducer: ({ state }) => {
    if (state.counter === 0) {
      return state;
    } else {
      return { ...state, counter: state.counter - 1 }
    }
  },
  reaction: ({ state }) => {
    if (state.counter === 0) {
      alert('counter at zero');
    }
  }
}
```

Again, lets consider the `decrement` event getting broadcasted when the state is `{ counter: 1 }`. Since the declaration doesn't have a situation, it will be invoked. Its reducer and reaction will both be queued. First the queued reducer will execute. The condition check will not hold, so it will transform the state into `{ counter: 0 }`. Then, the queued reaction will execute, it will receive the updated state of `{ counter: 0 }`. It's condition will hold, so the error message will be shown. We broadcasted `decrement` when the counter is `1`, and we ended up getting the error message.

The lesser important reasons why situations should exists is declarativity and convenience. Describing the situation in which a declaration should invoke is the declarative way. Using an if / else or a switch / case statement is the imperative way. Declarative approach should be preferrable when possible, it will make the code cleaner and more descriptive. Also, if you did it imperatively, you would have to duplicate your condition checks on all reactions / reducers. The imperative example above can be implemented like this:

```javascript
{
  on: 'decrement',
  situation: ({ state }) => state.counter > 0,
  reducer: ({ state }) => ({ ...state, counter: state.counter - 1 }),
  reactionElse: () => alert('counter at zero')
}
```

