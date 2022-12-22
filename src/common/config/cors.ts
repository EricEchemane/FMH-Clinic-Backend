export const getOrigin = () => {
  if (process.env.NODE_ENV === 'production') {
    return 'https://fmh.up.railway.app';
  }
  return 'http://localhost:3000';
};
