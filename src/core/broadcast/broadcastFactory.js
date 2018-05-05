import runSituation from '../situations/runSituation';
import ctx from '../ctx';

export default () => (eventKey, payload) => {
  const declaration = ctx.declarations[eventKey] || null;

  if (declaration) {
    const { situations, reactions, reactionsElse } = declaration;

    let situationHolds = true;
    situationHolds = (situations || []).reduce(
      (acc, s) => runSituation,
      situationHolds
    );
  }
};
