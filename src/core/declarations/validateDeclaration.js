export default declaration => {
  if (!declaration) {
    fail(
      `Expected declaration, got ${JSON.stringify(declaration)}`,
      'msm9g06+/LCoo3'
    );
  }
  if (!declaration.key && !declaration.keys) {
    fail('Declarations should have at least one key', 'f2+fpC38gEa8+V');
  }
};
