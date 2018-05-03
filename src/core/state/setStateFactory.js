import { fail } from '../../utils/alert';
import { provider } from '../provider/providerFactory';

export default () => value => {
  if (!provider || !provider.state) {
    fail(
      'Reclare not initialised. Did you wrap up your root component with <Reclare> ?',
      'ktnPHIQyiz8UyR'
    );
  }

  provider.setState(Object.assign(provider.state, { value }));
};
