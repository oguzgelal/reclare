import evaluateSituation from './evaluateSituation';

export default ({ situations, eventKey, payload }) => {
  return (situations || []).reduce(
    (acc, s) => () => evaluateSituation({ situation: s, eventKey, payload }),
    situationHolds
  );
}