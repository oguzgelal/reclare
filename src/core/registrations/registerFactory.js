import runSituation from '../situations/runSituation';
import { _ctx, Consumer } from '../../main';

export default () => (eventKey, payload) => {
  const declaration = _ctx.declarations[eventKey] || null;

  if (declaration) {
    const { situations, reactions, reactionsElse } = declaration;

    let situationHolds = true;
    situationHolds = (situations || []).reduce(
      (acc, s) => runSituation,
      situationHolds
    );
  }
};
