export default () => {
  const JWTSECRET = 'njas76d7aysdagsdta76das7dahkljfd7';
  switch (process.env.NODE_ENV) {
    case 'development':
      return {
        PGDATABASE: 'fmh_clinic',
        PGHOST: 'localhost',
        PGPASSWORD: '19126222',
        PGPORT: 5432,
        PGUSER: 'postgres',
        JWTSECRET,
      };
    case 'test':
      return {
        PGDATABASE: 'test',
        PGHOST: 'localhost',
        PGPASSWORD: '19126222',
        PGPORT: 5432,
        PGUSER: 'postgres',
        JWTSECRET,
      };
    // production
    default:
      return {
        PGDATABASE: 'railway',
        PGHOST: 'containers-us-west-125.railway.app',
        PGPASSWORD: '0sD1FaSiIYmL1DUdgunX',
        PGPORT: 7177,
        PGUSER: 'postgres',
        JWTSECRET,
      };
  }
};
