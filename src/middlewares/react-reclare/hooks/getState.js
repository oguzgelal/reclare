import { fail } from '../utils/alert';

export default provider => {
  const validateProvider = () => {
    if (!provider || !provider.state) {
      fail(
        'Reclare not initialised. Did you wrap up your root component with <Reclare> ?',
        'j53sf1TTDRJxJ4'
      );
    }
  };

  return [validateProvider];
};
