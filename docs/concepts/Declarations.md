## Declarations

A declaration is an object invokable by Reclare. It describes **the situational condition** for it to be invoked, and **what to do** if it the invocation takes place. It's reaction could be updating the state, executing logic / side-effects, or both.

Here is what it looks like:

```javascript
{
  // The event key the declaration is invoked
  // upon (see below).
  on: ...,

  // Situational condition that describes
  // the situation that the declaration
  // should be invoked upon.
  situation: ...,

  // State updater function, takes in the
  // current state and returns a new state.
  reducer: ...,

  // Reducer that executes if the
  // situational condition doesn't hold.
  reducerElse: ...,

  // A function to execute after the reducers.
  // This is where logic / side-effects should go.
  reaction: ...,

  // Reaction that executes if the situational
  // condition doesn't hold.
  reactionElse: ...,
}
```

A declaration is a general purpose api that can be used in any context. They can listen to a stream of broadcasted events and subscribe to a certain event type, or they can just be invoked imperatively.

The declaration api will be extensible in the near future, so one will be able to create their own declaration type to enhance functionality. But for now, two kinds of declarations comes out of the box with Reclare, **event declarations** and **subscription declarations**. Depending on the declaration type, the functions may receive extra parameters, but the declaration structure does not change.

### Event Declarations

Event declarations listens to the event channel and subscribes to specific events. They are provided to the context (or the duck files) by the field `onEvent`.

```javascript
createContext({
  onEvent: [{
    on: 'button_clicked',
    reducer: () => /* new state */,
    reaction: () => doSomething()
  }]
})
```

To broadcast an event to the event channel, the `broadcast` method could be used. First parameter is the event key, followed by the event payload. This payload gets passed on to the declaration functions.

```javascript
broadcast('event_key', { bar: 'foo' });
```

### Subscription Declarations

Subscription declarations gets invoked upon every state change, therefor the `on` key should be omitted. They receive the previous state (`prevState`) and the current state (`state`) as an argument to the situation functions, so you can do an identity check to see if there is a change. This allows you to create declarations that subscribes to a particular node in the state tree. Their situation function also receives an utility function `hasChange`, which takes in an object path and returns true only if there is a change at a given path. They are provided to the context (or the duck files) by the field `onStateChange` like so:

```javascript
createContext({
  onStateChange: [{
    situation: ({ hasChange }) => hasChange('user.email')
    reaction: () => alert('email address changed')
  }]
})
```

**Note**: Updating the state on a subscription declaration will cause all the subscriptions to be invoked again. **If a subscription declaration updates the state it is subscribed to, it will create an infinite loop**. It is the developers responsibility to avoid this situation.

```javascript
// This will create an infinite loop
createContext({
  onStateChange: [{
    situation: ({ hasChange }) => hasChange('count')
    reducer: ({ state }) => ({ ...state, count: state.count + 1 })
  }]
})
```

### Declaration Lifecycle

When Reclare context is created, the declarations gets parsed and merged by their `on` key. This reduces the complexity of finding declarations upon broadcasts to O(1) time. It also makes working with declarations very natural as it is possible to have multiple declarations with the same event key. Here is an example:

[View on JSFiddle](https://jsfiddle.net/oguzgelal/r7fnt6w4/)

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

The lifecycle of a declaration begins when one or more declarations gets triggered. First, the situation functions of the declarations gets evaluated. If the situational condition holds, reducers and reactions of the current declaration gets queued. Then, the queued reducers starts getting executed. Each one receives the state and returns a new state, which is then piped on to the next one. Each reducer triggers the subscription declarations. They receive the state before and after the reducer that triggered them. Next, the queued reactions gets executed. Each reaction receives the initial and the current state as arguments. They get executed after the reducers, so the state they receive is at its final. The event payload gets passed on to every function executed on each step.
