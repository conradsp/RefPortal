const DB_TYPES = {
  MONGO: 'MONGO',
  POSTGRES: 'POSTGRES',
  NONE: 'NONE'
};

const DB_TYPE = process.env.DB_TYPE || DB_TYPES.MONGO;

export default featureName =>
  `Attempted to use '${featureName}' but DB type '${DB_TYPE}' doesn't support it`;
