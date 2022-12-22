export default () => {
  switch (process.env.NODE_ENV) {
    case 'development':
      return 'environments/.env.dev';
    case 'test':
      return 'environments/.env.test';
    // production
    default:
      return 'environments/.env.prod';
  }
};
