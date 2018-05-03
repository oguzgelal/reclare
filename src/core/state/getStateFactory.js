import { fail } from '../../utils/alert';
import { provider } from '../provider/providerFactory';

export default () => () => {
  if (!provider || !provider.state) {
    fail(
      'Reclare not initialised. Did you wrap up your root component with <Reclare> ?',
      'cWUQgKt8/VRc9s'
    );
  }

  return provider.state.value;
};
