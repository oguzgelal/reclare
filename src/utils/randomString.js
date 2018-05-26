export default (n = 10) => {
  let text = '';
  const chars =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  for (let i = 0; i < n; i += 1) {
    text += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return text;
};
