const frontEndOrigin =
  process.env.NODE_ENV === 'development'
    ? 'https://localhost:3000'
    : 'https://fmh-clinic.vercel.app';

export default frontEndOrigin;
