## Context

[Reclare context](https://github.com/reclarejs/reclare/blob/master/src/ctx/ctx.js) is an enclosed object that holds everything together, including the state and the declarations. It also exposes the api; allowing access to `broadcast`, `subscribe`, `getState`, `registerMiddlewares` and `registerHooks` methods.

The context must be created using the `createContext` method. It takes an object for configuration options, and returns the context object.

```javascript
import { createContext } from 'reclare';

createContext({

  // Object
  // Sets the initial state
  initialState: {...},

  // Object array
  // Use to pass declarations for events
  // See broadcasts section for more details
  onEvent: [...],

  // Object array
  // Use to pass declarations for subscriptions
  // See subscriptions section for more details.
  onStateChange: [...],

  // Object array
  // Use to pass duck file configurations.
  // See ducks section for more details.
  ducks: [...],

  // Object
  // Use to pass middleware hooks.
  // See middlewares section for more details.
  middlewares: {...},

  // Boolean
  // Create the context but do not set it as the global context (default: false)
  createOnly: false,
})
```

### Global context
When you call `createContext`, the created context will be set as the **global context**, which allows Reclare to find and refer to it automatically. Therefore, exposed methods could be imported and used directly without having to pass on the context object.

```javascript
import { createContext, broadcast } from 'reclare';

// createContext method sets the created context as the global context
createContext({
  onEvent: [{
    on: 'a',
    reaction: () => console.log('a')
  }]
})

// We can import & use api methods directly, which will refer to the global context
broadcast('a'); // prints: a
```

```javascript
import { createContext, broadcast } from 'reclare';

// createContext method returns the context 
const ctx = createContext({
  onEvent: [{
    on: 'a',
    reaction: () => console.log('a')
  }]
})

broadcast('a'); // prints: a

// We can access api methods directly from the context object
ctx.broadcast('a'); // prints: a
```

`createContext` overwrites the previous global context when its called more than once: 

```javascript
import { createContext, broadcast } from 'reclare';

const ctx1 = createContext({
  onEvent: [{
    on: 'a',
    reaction: () => console.log('a1')
  }]
})

broadcast('a') // prints: a1

const ctx2 = createContext({
  onEvent: [{
    on: 'a',
    reaction: () => console.log('a2')
  }]
})

ctx1.broadcast('a') // prints: a1
ctx2.broadcast('a') // prints: a2
broadcast('a') // prints: a2
```

`createOnly` option will avoid `createContext` to set the created context as global. 

```javascript
import { createContext, broadcast } from 'reclare';

const ctx1 = createContext({
  onEvent: [{
    on: 'a',
    reaction: () => console.log('a1')
  }]
})

const ctx2 = createContext({
  createOnly: true,
  onEvent: [{
    on: 'a',
    reaction: () => console.log('a2')
  }]
})

// This targets the first context created, because the second one is created with `createOnly: true` thus it isn't set as the global context
broadcast('a') // prints: a1
```