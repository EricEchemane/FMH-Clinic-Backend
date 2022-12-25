export const getOrigin = () => {
  if (process.env.NODE_ENV === 'production') {
    return 'https://fmh.onrender.com';
  }
  return 'http://localhost:3000';
};
