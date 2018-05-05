import { fail } from '../utils/alert';

export default provider => {
  const validateProvider = () => {
    if (!provider || !provider.state) {
      fail(
        'Reclare not initialised. Did you wrap up your root component with <Reclare> ?',
        'bc6oJGrjvbhLzC'
      );
    }
  };

  const setProviderState = (prevState, state) => {
    provider.setState({
      value: state
    });
  };

  return [validateProvider, setProviderState];
};
