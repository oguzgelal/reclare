## Subscriptions

```javascript
createContext({
  initialState: { count: 0 },
  onEvent: [{
    on: 'increment',
    reducer: ({ state }) => ({ ...state, count: state.count + 1 })
  }]
  onStateChange: [
    {
      // Subscription declarations receives the `prevState` and `state`, so to subscribe to a specific part of the state, you can compare if it has changed like so:
      when: ({ state, prevState }) => state.count !== prevState.count,
      reaction: () => console.log('counter changed')
    },
    {
      // You can also use the `hasChange` method, which simply takes the object path of the node to be compared. This is a syntactic sugar for comparing objects refs manually.
      when: ({ hasChange }) => hasChange('count')
      reaction: () => console.log('counter changed')
    }
  ]
})
```