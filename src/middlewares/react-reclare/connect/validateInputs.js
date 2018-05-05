export default (mapStateToProps, Wrap) => {
  if (!mapStateToProps || typeof mapStateToProps !== 'function') {
    fail(
      `First argument of connect must be a function, received: ${JSON.stringify(
        mapStateToProps
      )}`,
      '1faMX7E2xqlyCF'
    );
  }
  if (!Wrap) {
    fail(
      'The HOC returned by the connect method must immediately wrap a React component',
      'oBi1y12ZjYJHrA'
    );
  }
};
