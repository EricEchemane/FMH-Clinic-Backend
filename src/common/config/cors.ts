export const getOrigin = () => {
  if (process.env.NODE_ENV === 'production') {
    return 'https://fmh-clinic.up.railway.app';
  }
  return 'http://localhost:3000';
};
