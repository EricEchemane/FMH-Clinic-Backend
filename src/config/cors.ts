export const whiteList = [
  'http://localhost:3000',
  'https://fmh-animal-clinic.vercel.app',
  'https://fmh.up.railway.app',
];

export const getOrigin = () => {
  if (process.env.NODE_ENV === 'production') {
    return 'https://fmh.up.railway.app';
  }
  return 'http://localhost:3000';
};
