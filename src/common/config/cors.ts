export const getOrigin = () => {
  if (process.env.NODE_ENV === 'production') {
    return 'https://fmh.fly.dev';
  }
  return 'http://localhost:3000';
};
