## Situations (when)

Situations (situational conditions, alias: `when`) are functions that can be used to describe the situation in which the declaration should invoke. For example, the when function below describes a situation where the counter is greater than zero, so the declaration will only be invoked if that situational condition holds.

```javascript
{
  on: 'decrement',
  when: ({ state }) => state.counter > 0,
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
    when: ({ state, event }) => something(state)
  }],

  // you can access the event payload, previous version 
  // and the current versions of the state. hasChange 
  // function is also accessible like so
  onStateChange: [{
    when: ({ state, prevState, event, hasChange, }) =>
      hasChange('a.b.c')
  }]
})
```

The condition holds if the when function returns true or a truthy value. If it is not a function, its truthy / falsy value will dictate if the condition holds or not. Omitting `when` is equivalent to setting it to true, it will hold every time.

```javascript
{
  // doesn't hold: falsy value
  when: null;

  // doesn't hold: falsy value
  when: '';

  // holds: truthy value
  when: 'a';

  // holds: true
  when: true;

  // holds: returns true
  when: ({ state, event }) => true;

  // holds if x is 3
  when: ({ state, event }) => state.x === 3;
}
```

### Multiple situations

You can define multiple situations for a declaration. There are two ways of doing this: you can either input an array of situations, or you can use the `and`, `or` and `not` logical operators to build up your own custom logic. You can compose these operators and create your own logical flow. Inputting a situation array is equivalent to combining them by and.

```javascript
import { and, or, not } from 'reclare';

...

// below two are equivalent
when: [fn1, fn2, fn3],
when: () => fn1() && fn2() && fn3()

// below two are equivalent
when: and(fn1, or(fn2, not(fn3)))
when: () => fn1() && (fn2() || !fn3())

// example
when: [
  ({ state }) => state.count >= 0,
  ({ event }) => !event.preventDecrement
]

// example
when:
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

If you declare an asynchronous when function, it will not be awaited during its evaluation. If it returns undefined when executed, it will be interpreted as the condition doesn’t hold since it is a falsy value. If it returns a promise, it will evaluate to true (as it is a truthy value) and it will always hold.

```javascript
// THESE ARE WRONG
{
  // doesn't hold: returns undefined, evaluates to false
  when: () => {
    fetch('/api').then(res => true);
  };

  // holds: returns a promise, evaluates to a true
  when: () =>
    new Promise(resolve => {
      setTimeout(() => resolve(false), 1000);
    });
}
```

### Why are situations necessary ?

There have been some discussions on whether situations are necessary or not. One might argue that it adds some complexity to declarations, and it would be simpler to check the condition in the reducers / reactions. However, situations are more than just syntactic sugars.

The reason why situations must exist is related to the way Reclare orchestrates the declaration functions. When an event is broadcasted, Reclare makes sure that all the `when` functions of all triggered declarations are evaluated against the same situation, that is, the situation at the exact moment of the broadcast. In other words, all `when` functions will certainly receive the state at the time of the broadcast. This is only possible if `when` functions are not embedded inside reactions / reducers and are provided separately to the declaration. Consider the decrement counter example where the counter can't go below zero:

```javascript
{
  on: 'decrement',
  when: ({ state }) => state.counter > 0,
  reducer: ({ state }) => ({ ...state, counter: state.counter - 1 })
},
{
  on: 'decrement',
  when: ({ state }) => state.counter === 0,
  reaction: () => alert('counter at zero')
}
```

Let's say `decrement` event is broadcasted when the state is `{ counter: 1 }`. Two of the declarations above will get triggered, and Reclare will make sure both of their `when` functions receives the state `{ counter: 1 }`. First one will hold, its reducer will be queued. Second one will not hold, and it will not be invoked. Then the queued reducer will executed and transform the state into `{ state: 0 }`. Now let's see what happens if we checked the conditions imperatively:

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

Lets consider again that the `decrement` event getting broadcasted when the state is `{ counter: 1 }`. Since the declaration doesn't have a when function, it will be invoked. Its reducer and reaction will both be queued. First the queued reducer will execute. The condition check will not hold, so it will transform the state into `{ counter: 0 }`. Then, the queued reaction will execute, it will receive the updated state of `{ counter: 0 }`. It's condition will hold, so the error message will be shown. We broadcasted `decrement` when the counter is `1`, and we ended up getting the error message.

Other reasons on why situations should exists is convenience and declarativeness. Describing the situational condition is the declarative approach. Using if/else or switch/case statements is the imperative approach. Declarative approach should be preferrable when possible, because it makes the code cleaner and more descriptive. Also, if you used the imperative approach, you would have to duplicate your condition checks on all reactions / reducers. The imperative example above can be written like this:

```javascript
{
  on: 'decrement',
  when: ({ state }) => state.counter > 0,
  reducer: ({ state }) => ({ ...state, counter: state.counter - 1 }),
  reactionElse: () => alert('counter at zero')
}
```

