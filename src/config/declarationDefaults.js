export default {
  /**
   * TODO: awaiting implementation
   *
   * If true, the broadcast will take effect after the current event
   * loop tick - basically be wrapped with setSimeout(___, 0).
   *
   * This option is good for high frequency events such as "on key pressed"
   * when you want the broadcast to be non-blocking.
   *
   * Type <bool>
   * Default is false
   */

  defer: false,

  /**
   * TODO: awaiting implementation
   *
   * Debounces the execution of a broadcast. This option should is good
   * executing effects on high frequency effects (ie. autocomplete)
   *
   * Type <int> (milliseconds)
   * Default is null
   */

  debounce: null
};
