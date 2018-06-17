## Declarations

A declaration defines how to react to a certain event under the conditions at the time of the event. They can be seen as 4-tuples that holds together an event key, a situation function, state updaters and business logic. When the specified event key is broadcasted and the situation function evaluates to true, the declaration gets invoked and its reducers and reactions are executed. A declaration is a simple object that looks like this:

```javascript
{
  on: ..., // str or str[]
  situation: ..., // fn or fn[] or any
  reducer: ..., // fn or fn[]
  reducerElse: ..., // fn or fn[]
  reaction: ..., // fn or fn[]
  reactionElse: ..., // fn or fn[]
}
```

`on`  -  The event key that declaration is invoked upon. If an array of keys are provided, the declaration will be invoked upon all.

[situation](/docs/concepts/Situations.md)  -  Declaration is invoked only when the situation evaluates to true or a truthy value. If a function or an array of functions are provided, their return value will be evaluated. If anything else is provided, their truthy / falsy values will be considered. Omitting it is equivalent to setting it to true.

[reducer](/docs/concepts/Reducers.md)  - State updater function, takes in the current state and specifies how the state will change by returning the new state. It can take a function or an array of functions, executed when situation is true.

[reducerElse](/docs/concepts/Reducers.md)  -  Same with reducer, executed when situation is false.

[reaction](/docs/concepts/Reactions.md)  -  This is where the logic should go. It can take a function or an array of functions, executed when situation is true.

[reactionElse](/docs/concepts/Reactions.md)  -  Same as reaction, executed when situation is false.

As for broadcasting events: it is as simple as it sounds - you just use the broadcast method. First parameter of broadcast is the event key, followed by the event payload - which will be passed on to the declaration functions.

```javascript
broadcast("event_key", { bar: 'foo' })
```

### Declaration Lifecycle

When Reclare's context is initialised, the declarations gets parsed and merged by their event key. This reduces the complexity of finding declarations upon broadcasts instantaneous - in O(1) time. Also this makes working with declarations very natural and straight forward as it's possible to have multiple declarations with the same event key:

```javascript
{
  on: 'a',
  reaction: () => console.log('a1')
},
{
  on: 'a',
  reaction: () => console.log('a2')
},
{
  on: 'b',
  reaction: () => console.log('b')
},
{
  on: ['a', 'b'],
  reaction: () => console.log('ab')
}

broadcast('a') // prints: a1 a2 ab
broadcast('b') // prints: b ab
```

![declaration](https://user-images.githubusercontent.com/2817993/41509889-c789d532-7263-11e8-96ca-4ab89bd32fdd.png)

The lifecycle of declarations begins on their invocation. As declarations with the same event keys gets merged, they all get invoked at the same time in parallel. Upon the invocation, the state at the time is kept to be used later in the process. The process starts with all the situations getting evaluated with the initial state as an argument. When a  situation evaluates to true, reducers and reactions of the current declaration gets queued to be executed later. After situations, the queued reducers starts getting executed. Each one receives the state and returns a new state, which is then piped on to the next one. Each reducer triggers the subscriptions, which receives the state before and after the reducer that triggered them. Next, it is then the reactions turn to execute. Each reactions receive the initial and the current state as arguments. The event payload is passed on to everything that is executed during this process.

Declarations is a general-purpose API which is also used in the context of subscriptions. Subscription declarations gets invoked every time the state changes, therefore the on key should be omitted. Their situation functions receive the previous and the current state, so with a simple identity check or with the hasChange utility function, one can have the declaration run only when a certain part of the state changes. For more details, see the [subscriptions section](/docs/concepts/Subscriptions.md).