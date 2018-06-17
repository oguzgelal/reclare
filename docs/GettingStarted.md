## Getting Started

To get started, first add reclare to your project:

```bash
# using yarn
yarn add reclare

# using npm
npm install reclare --save
```

If you'd like to use the React middleware (recommended for React projects), add the react-reclare package as well:

```bash
# using yarn
yarn add react-reclare

# using npm
npm install react-reclare --save
```

Then, as early as possible in your code, create the Reclare context:

```javascript
import { createContext } from 'reclare';

createContext({
  initialState: {...},
  onEvent: [...],
  onStateChange: [...],
  ducks: [...],
})
```

If you're using React-Reclare, wrap your root component with `ReclareProvider` and pass the Reclare context like so:

```javascript
import { createContext } from 'reclare';
import { ReclareProvider } from 'react-reclare';

const ctx = createContext({
  initialState: {...},
  onEvent: [...],
  onStateChange: [...],
  ducks: [...],
})

const base = (
  <ReclareProvider context={ctx}>
    <App />
  </ReclareProvider>
);

ReactDOM.render(base, document.getElementById('root'));
```