## Declarations

A declaration is an invokable object by Reclare, that describes **under what condition** should it respond to its invocation and **what to do** if the condition holds. It's reaction could be updating the state, executing logic / side-effects, or both. 

Here is what it looks like:


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

`on`  -  The event key that declaration is invoked upon (see below).

[situation](/docs/concepts/Situations.md)  -  Declaration is invoked only when the situation evaluates to true or a truthy value.

[reducer](/docs/concepts/Reducers.md)  - State updater function, takes in the current state and specifies how the state will change by returning the new state.

[reducerElse](/docs/concepts/Reducers.md)  -  Same with reducer, executed when situation evaluates to false.

[reaction](/docs/concepts/Reactions.md)  -  Function that holds the logic.

[reactionElse](/docs/concepts/Reactions.md)  -  Same as reaction, executed when situation evaluates to false.

It is a general purpose api that could be invoked in different ways. Currently there are two: they either listen to the event channel and subscribe to specific events (event declarations), or they get invoked upon every state change (subscription declarations). Depending on their invocation context, their functions may receive different parameters, but their structure do not change.

Subscription declarations gets invoked automatically when the state is updated through the reducers. To use the event declarations, you simply broadcast events. It is as simple as it sounds - you just use the broadcast method. First parameter of broadcast is the event key, followed by the event payload - which will be passed on to the declaration functions.

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